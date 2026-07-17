import nodemailer from "nodemailer";

const PRODUCT_LABELS: Record<string, string> = {
  ebook: "el Ebook",
  ebook_auditoria: "el Ebook + tu Auditoría Digital Personalizada",
};

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendDeliveryEmail({
  to,
  productType,
}: {
  to: string;
  productType: string;
}): Promise<void> {
  const transporter = getTransporter();
  const downloadUrl = process.env.EBOOK_DOWNLOAD_URL;
  const gmailUser = process.env.GMAIL_USER;

  if (!transporter || !downloadUrl) {
    console.error(
      "Falta GMAIL_USER, GMAIL_APP_PASSWORD o EBOOK_DOWNLOAD_URL: no se pudo enviar el email de entrega."
    );
    return;
  }

  const productLabel = PRODUCT_LABELS[productType] ?? "tu compra";
  const includesAuditoria = productType === "ebook_auditoria";

  const html = `
    <div style="font-family: Georgia, serif; background-color: #0A1628; padding: 40px 24px; color: #FFFFFF;">
      <div style="max-width: 480px; margin: 0 auto; text-align: center;">
        <p style="color: #C9A84C; font-size: 22px; font-weight: bold; margin-bottom: 24px;">buzBoozt</p>
        <h1 style="font-size: 24px; margin-bottom: 16px;">¡Gracias por tu compra!</h1>
        <p style="color: #A0A0A0; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
          Ya tenés acceso a ${productLabel}. Hacé click en el botón para descargar el ebook.
        </p>
        <a href="${downloadUrl}" style="display: inline-block; background-color: #C9A84C; color: #0A1628; font-family: Arial, sans-serif; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 8px; margin-bottom: 24px;">
          Descargar el ebook
        </a>
        ${
          includesAuditoria
            ? `<p style="color: #A0A0A0; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
                Además compraste la <strong style="color: #FFFFFF;">Auditoría Digital Personalizada</strong>.
                Nos vamos a contactar por WhatsApp para coordinar el horario de tu sesión.
              </p>`
            : ""
        }
        <p style="color: #A0A0A0; font-family: Arial, sans-serif; font-size: 13px; margin-top: 32px;">
          Cualquier duda, respondé este email.
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `buzBoozt <${gmailUser}>`,
      to,
      subject: "Tu acceso a De Consultorio Vacío a Lista de Espera",
      html,
    });
  } catch (error) {
    console.error("Error enviando el email de entrega:", error);
  }
}

export async function sendAdminSaleNotification({
  buyerEmail,
  productType,
  amount,
}: {
  buyerEmail: string;
  productType: string;
  amount: number;
}): Promise<void> {
  const transporter = getTransporter();
  const gmailUser = process.env.GMAIL_USER;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || gmailUser;

  if (!transporter || !adminEmail) {
    console.error(
      "Falta GMAIL_USER/GMAIL_APP_PASSWORD o ADMIN_NOTIFICATION_EMAIL: no se pudo avisar la venta."
    );
    return;
  }

  const productLabel = PRODUCT_LABELS[productType] ?? productType;

  try {
    await transporter.sendMail({
      from: `buzBoozt <${gmailUser}>`,
      to: adminEmail,
      subject: `Nueva venta: ${productLabel} — $${amount}`,
      html: `
        <p><strong>Nueva venta confirmada.</strong></p>
        <ul>
          <li>Producto: ${productLabel}</li>
          <li>Monto: $${amount}</li>
          <li>Comprador: ${buyerEmail}</li>
        </ul>
        <p>Si el email de entrega automática no le llega (por ejemplo, si se
        alcanzó la cuota diaria de Gmail), respondele manualmente a este
        email con el link de descarga.</p>
      `,
    });
  } catch (error) {
    console.error("Error enviando el aviso de venta al admin:", error);
  }
}
