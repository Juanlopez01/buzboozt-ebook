import Link from "next/link";
import type { Metadata } from "next";
import PurchaseEvent from "@/components/PurchaseEvent";

export const metadata: Metadata = {
  title: "¡Gracias por tu compra! · Buzboozt",
};

interface PaymentDetails {
  status: string;
  transaction_amount: number;
  currency_id: string;
}

async function getPayment(paymentId: string): Promise<PaymentDetails | null> {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) return null;

  try {
    const res = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: { payment_id?: string; collection_id?: string };
}) {
  const paymentId = searchParams.payment_id ?? searchParams.collection_id;
  const payment = paymentId ? await getPayment(paymentId) : null;
  const isApproved = payment?.status === "approved";

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 text-center">
      {isApproved && payment && (
        <PurchaseEvent
          value={payment.transaction_amount}
          currency={payment.currency_id}
          eventId={paymentId!}
        />
      )}
      <div className="max-w-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-navy text-3xl">
          ✓
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-graylight text-lg mb-8">
          Tu pago fue confirmado. En los próximos minutos vas a recibir un
          email con el acceso al ebook y todos los bonuses. Revisá también tu
          carpeta de spam por las dudas.
        </p>
        <p className="text-graylight text-sm mb-8">
          Si compraste la Auditoría Digital Personalizada, nos vamos a poner
          en contacto por WhatsApp para coordinar el horario de tu sesión.
        </p>

        <div className="mb-8 rounded-xl border border-gold/20 bg-navy-medium p-6">
          <p className="text-graylight text-sm mb-4">
            ¿No te llegó el email en unos minutos? Escribinos y te lo
            mandamos al toque.
          </p>
          <a
            href={
              process.env.NEXT_PUBLIC_WHATSAPP_URL ||
              "https://wa.me/543624804761"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-2.5 font-sans font-semibold text-gold hover:bg-gold hover:text-navy transition"
          >
            Escribinos por WhatsApp
          </a>
        </div>

        <Link
          href="/"
          className="inline-block rounded-lg bg-gold px-8 py-3 font-sans font-semibold text-navy hover:opacity-90 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
