import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createOrder, getOrderByPaymentId } from "@/lib/db";
import { sendDeliveryEmail, sendAdminSaleNotification } from "@/lib/email";

function isValidSignature(request: NextRequest, dataId: string): boolean {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (!secret) {
    console.warn(
      "MERCADOPAGO_WEBHOOK_SECRET no configurado: se omite la verificación de firma del webhook."
    );
    return true;
  }

  const signatureHeader = request.headers.get("x-signature");
  const requestId = request.headers.get("x-request-id");
  if (!signatureHeader || !requestId) return false;

  const parts: Record<string, string> = {};
  for (const part of signatureHeader.split(",")) {
    const [key, value] = part.split("=");
    if (key && value) parts[key.trim()] = value.trim();
  }

  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) return false;

  const manifest = `id:${dataId.toLowerCase()};request-id:${requestId};ts:${ts};`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(v1));
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const queryType = url.searchParams.get("type") ?? url.searchParams.get("topic");
  const queryDataId =
    url.searchParams.get("data.id") ?? url.searchParams.get("id");

  let body: { type?: string; data?: { id?: string } } | null = null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }

  const type = queryType ?? body?.type;
  const dataId = queryDataId ?? body?.data?.id;

  if (!dataId) {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  if (!isValidSignature(request, String(dataId))) {
    console.warn("Webhook de MercadoPago con firma inválida, ignorado.");
    return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
  }

  if (type !== "payment") {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    console.error(
      "MERCADOPAGO_ACCESS_TOKEN no configurado: no se puede validar el pago del webhook."
    );
    return NextResponse.json({ received: true }, { status: 200 });
  }

  try {
    const client = new MercadoPagoConfig({ accessToken });
    const payment = await new Payment(client).get({ id: String(dataId) });

    console.log("Pago confirmado vía webhook de MercadoPago:", {
      id: payment.id,
      status: payment.status,
      external_reference: payment.external_reference,
      transaction_amount: payment.transaction_amount,
      payer_email: payment.payer?.email,
    });

    const paymentId = String(payment.id);
    const email = payment.payer?.email;
    const payerName = [payment.payer?.first_name, payment.payer?.last_name]
      .filter(Boolean)
      .join(" ")
      .trim();

    if (payment.status === "approved" && email) {
      const existingOrder = await getOrderByPaymentId(paymentId);

      if (!existingOrder) {
        await createOrder({
          paymentId,
          email,
          productType: payment.external_reference ?? "ebook",
          amount: payment.transaction_amount ?? 0,
          status: payment.status,
          payerName: payerName || null,
        });

        await sendDeliveryEmail({
          to: email,
          productType: payment.external_reference ?? "ebook",
        });

        await sendAdminSaleNotification({
          buyerEmail: email,
          productType: payment.external_reference ?? "ebook",
          amount: payment.transaction_amount ?? 0,
        });
      }
    }
  } catch (error) {
    console.error("Error procesando el pago del webhook:", error);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
