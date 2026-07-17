import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const PRODUCTS = {
  ebook: {
    title: "Ebook: De Consultorio Vacío a Lista de Espera en 12 Semanas",
    price: 9999,
  },
  ebook_auditoria: {
    title:
      "Ebook: De Consultorio Vacío a Lista de Espera en 12 Semanas + Auditoría Digital Personalizada",
    price: 29998,
  },
} as const;

type TipoCompra = keyof typeof PRODUCTS;

function isTipoCompra(value: unknown): value is TipoCompra {
  return typeof value === "string" && value in PRODUCTS;
}

export async function POST(request: NextRequest) {
  try {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { error: "MercadoPago no está configurado en el servidor." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { tipo } = body;

    if (!isTipoCompra(tipo)) {
      return NextResponse.json(
        { error: "Tipo de compra inválido." },
        { status: 400 }
      );
    }

    const producto = PRODUCTS[tipo];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: tipo,
            title: producto.title,
            quantity: 1,
            unit_price: producto.price,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: `${siteUrl}/gracias`,
          failure: `${siteUrl}/error`,
          pending: `${siteUrl}/pendiente`,
        },
        auto_return: "approved",
        notification_url: `${siteUrl}/api/webhooks/mercadopago`,
        external_reference: tipo,
      },
    });

    return NextResponse.json({ init_point: result.init_point });
  } catch (error) {
    console.error("Error creando preferencia de MercadoPago:", error);
    return NextResponse.json(
      { error: "No se pudo crear la preferencia de pago." },
      { status: 500 }
    );
  }
}
