# Buzboozt — Landing "De Consultorio Vacío a Lista de Espera en 12 Semanas"

Landing page de ventas en Next.js 14 (App Router) + Tailwind CSS, con checkout
integrado vía MercadoPago.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- MercadoPago SDK para Node.js
- Deploy recomendado: Vercel

## Setup local

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Copiar el archivo de variables de entorno y completar el token real:

   ```bash
   cp .env.example .env.local
   ```

   Variables necesarias en `.env.local`:

   ```
   MERCADOPAGO_ACCESS_TOKEN=tu_access_token_de_mercadopago
   MERCADOPAGO_WEBHOOK_SECRET=tu_clave_secreta_del_webhook
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_META_PIXEL_ID=tu_pixel_id_de_meta
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   DATABASE_URL=postgres://...
   GMAIL_USER=tu_cuenta@gmail.com
   GMAIL_APP_PASSWORD=tu_contraseña_de_aplicacion
   ADMIN_NOTIFICATION_EMAIL=tu_cuenta@gmail.com
   EBOOK_DOWNLOAD_URL=https://link-directo-al-pdf-del-ebook
   NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/5491122334455
   ```

   **Cómo conseguir el `MERCADOPAGO_ACCESS_TOKEN`:**
   1. Entrá a [mercadopago.com.ar/developers/panel](https://www.mercadopago.com.ar/developers/panel).
   2. Creá una aplicación (o usá una existente).
   3. En **Credenciales de producción**, copiá el "Access Token" (empieza
      con `APP_USR-...`). Para probar sin cobrar de verdad, usá las
      **Credenciales de prueba** en su lugar mientras testeás.

   **Cómo conseguir el `MERCADOPAGO_WEBHOOK_SECRET`:**
   1. En el mismo panel de tu aplicación, andá a **Webhooks**.
   2. Configurá la URL `https://tu-dominio.com/api/webhooks/mercadopago`
      (tiene que ser pública — no funciona con `localhost` en desarrollo).
   3. Suscribite al evento **Pagos**.
   4. Copiá la "Clave secreta" que te muestra ahí.

   **Cómo conseguir el `NEXT_PUBLIC_META_PIXEL_ID`:**
   1. En [business.facebook.com/events_manager](https://business.facebook.com/events_manager),
      entrá a tu Pixel (o creá uno nuevo).
   2. El ID es el número que aparece arriba a la izquierda (ej. `1234567890123456`).

   **Cómo conseguir el `NEXT_PUBLIC_GA_MEASUREMENT_ID`:**
   1. En [analytics.google.com](https://analytics.google.com), creá una
      propiedad GA4 (o usá una existente).
   2. Admin → **Flujos de datos** → tu flujo web → el ID empieza con `G-`.

   **Cómo conseguir el `DATABASE_URL` (Vercel Postgres / Neon):**
   1. En tu proyecto en Vercel, andá a la pestaña **Storage** → **Create Database** → **Postgres**.
   2. Vercel provisiona una base en Neon y la conecta sola a tu proyecto.
   3. Para desarrollo local, corré `vercel env pull .env.local` (con el
      [Vercel CLI](https://vercel.com/docs/cli)) para bajar la connection
      string real a tu `.env.local` — así usás la misma base en local y en
      producción, sin instalar Postgres localmente.

   **Cómo conseguir `GMAIL_USER` y `GMAIL_APP_PASSWORD`:**

   El envío de emails (entrega del ebook + aviso de venta) usa tu cuenta de
   Gmail como servidor SMTP — no hace falta dominio propio.

   1. Activá la verificación en dos pasos en tu cuenta de Google:
      [myaccount.google.com/security](https://myaccount.google.com/security).
   2. Andá a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
   3. Generá una contraseña de aplicación (elegí "Otra" y ponele un nombre,
      ej. "Buzboozt Web"). Te da un código de 16 caracteres — copialo como
      `GMAIL_APP_PASSWORD` (sin espacios).
   4. `GMAIL_USER` es tu dirección completa de Gmail.

   Gmail permite hasta ~500 emails por día en cuentas gratuitas — de sobra
   para el volumen inicial. Los emails van a salir desde tu propia
   dirección (`tunombre@gmail.com`) en vez de un dominio propio; podés
   migrar a un servicio como Resend con dominio verificado más adelante sin
   tocar el resto del código, solo `lib/email.ts`.

   **`ADMIN_NOTIFICATION_EMAIL`:** a dónde te llega el aviso de cada venta
   nueva (nombre, producto, monto del comprador). Si no la definís, usa el
   mismo `GMAIL_USER`.

   **`EBOOK_DOWNLOAD_URL`:** el link directo de descarga del PDF final
   (Drive, Dropbox, etc. — tiene que ser un link que descargue el archivo
   directamente, no una carpeta).

   **`NEXT_PUBLIC_WHATSAPP_URL`:** link tipo `https://wa.me/54911...` que
   se usa en el botón de soporte de `/gracias` ("¿no te llegó el email?") y
   en el CTA de la sección de Servicio Web. Si no la definís, ambos usan
   `https://wa.me/543624804761` como fallback hardcodeado en el código.

   Si dejás `MERCADOPAGO_WEBHOOK_SECRET`, `NEXT_PUBLIC_META_PIXEL_ID`,
   `DATABASE_URL`, `GMAIL_USER`/`GMAIL_APP_PASSWORD` o `EBOOK_DOWNLOAD_URL`
   sin completar, esas funciones quedan desactivadas sin romper el resto de
   la página (el checkout y el resto del sitio siguen funcionando igual).

3. Correr el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   La landing queda disponible en `http://localhost:3000`.

## Estructura relevante

- `app/page.tsx` — composición de la landing (secciones en `components/landing`).
- `app/api/checkout/route.ts` — crea la preferencia de pago en MercadoPago y
  devuelve el `init_point` para redirigir al checkout.
- `app/api/webhooks/mercadopago/route.ts` — recibe la notificación
  server-to-server de MercadoPago cuando un pago cambia de estado, verifica
  la firma y consulta el pago real vía API (ver sección de Webhook abajo).
- `app/gracias`, `app/error`, `app/pendiente` — páginas de retorno post-pago
  (`back_urls` de MercadoPago). `/gracias` además verifica el pago
  server-side y dispara el evento `Purchase` de Meta Pixel.
- `app/demo/page.tsx` — página standalone con el panel `AdminDemo` a
  pantalla casi completa (pensada para compartir como link directo en
  ventas), con CTA a WhatsApp al final.
- `components/CheckoutButton.tsx` — botón client-side que llama a
  `/api/checkout` y redirige al usuario.
- `components/MetaPixel.tsx` — script base del Meta Pixel (se inyecta en
  `app/layout.tsx`, dispara `PageView` en toda la página).
- `components/PurchaseEvent.tsx` — dispara el evento `Purchase` en
  `/gracias`, una sola vez por pago (evita duplicados en refresh).
- `lib/db.ts` — tabla `orders` (Postgres/Neon) y funciones para
  registrar/consultar compras, con `payment_id` como clave para evitar
  duplicados.
- `lib/email.ts` — arma y envía (vía Gmail SMTP) el email de entrega del
  ebook al comprador y el aviso de venta nueva al vendedor.
- `components/landing/WebServiceSection.tsx` — sección de venta del
  servicio de desarrollo web ($150.000), con CTA directo a WhatsApp (no
  pasa por MercadoPago, es una venta por consulta).
- `components/landing/SocialProofPopup.tsx` — widget flotante de "compra
  reciente" con una lista fija de nombres/ciudades de ejemplo que rota
  cada 30s (no está conectado a la tabla `orders`).
- `components/landing/LastSpotsBadge.tsx` — badge genérico de urgencia
  ("Últimos cupos a este precio"), sin contador numérico inventado.

## Webhook de MercadoPago (confirmación de pago)

El flujo de `back_urls` (redirect a `/gracias` tras pagar) es suficiente para
mostrarle algo al usuario, pero **no es 100% confiable**: si cierra el
navegador antes de volver, nunca te enterás de que pagó. Por eso además hay
un webhook en `/api/webhooks/mercadopago` que MercadoPago llama directamente
a tu servidor cuando el pago se confirma, sin depender del usuario.

Ese endpoint:
1. Verifica la firma de la notificación (con `MERCADOPAGO_WEBHOOK_SECRET`).
2. Consulta el pago real contra la API de MercadoPago (nunca confía en los
   datos que vienen en la notificación sin verificar).
3. Si el pago está `approved` y todavía no existe una orden con ese
   `payment_id` en la base (evita duplicados si MercadoPago reintenta el
   webhook), guarda la orden y dispara el email de entrega.

## Entrega automática del ebook

Cuando el webhook confirma un pago aprobado:
1. Guarda la orden en la tabla `orders` (email, producto, monto, estado,
   fecha) — esto permite auditar compras y resolver reclamos ("pagué y no
   me llegó") buscando por email o `payment_id`.
2. Manda (por Gmail SMTP) un email al comprador con el link de
   `EBOOK_DOWNLOAD_URL` (`payment.payer.email`, que devuelve MercadoPago).
3. Manda otro email a `ADMIN_NOTIFICATION_EMAIL` avisando la venta nueva
   (producto, monto, email del comprador) — así te enterás al toque de
   cada compra aunque no estés revisando el sitio.

Si falta `DATABASE_URL`, `GMAIL_USER`/`GMAIL_APP_PASSWORD` o
`EBOOK_DOWNLOAD_URL`, esa parte queda desactivada (se loguea el error pero
no rompe el resto del webhook) y la entrega vuelve a depender de revisar
los logs, el email de aviso al admin, o el panel de MercadoPago manualmente
(por eso el botón de WhatsApp en `/gracias` sirve como red de contención:
si el comprador no recibe nada, te escribe directo).

## Meta Pixel (tracking de conversión para ads)

Con `NEXT_PUBLIC_META_PIXEL_ID` configurado, el Pixel se carga en todas las
páginas (evento `PageView`) y dispara `Purchase` en `/gracias` **solo si el
pago fue verificado como aprobado contra la API de MercadoPago** (no confía
en los parámetros de la URL, que un usuario podría manipular). El monto
enviado al pixel es el monto real cobrado, no el que se muestra en el
frontend.

## Google Analytics 4

Con `NEXT_PUBLIC_GA_MEASUREMENT_ID` configurado, se carga
`@next/third-parties/google` (`<GoogleAnalytics />`) en `app/layout.tsx` —
el paquete oficial de Next.js para gtag.js, optimizado para no bloquear el
render. Trackea `page_view` automáticamente en toda la página y, en
`/gracias`, `components/PurchaseEvent.tsx` dispara un evento `purchase` de
GA4 con el mismo monto verificado server-side que usa Meta Pixel (mismo
componente, misma fuente de datos, sin duplicar lógica de verificación).

## Productos configurados

| tipo               | Producto                                  | Precio (ARS) |
| ------------------- | ------------------------------------------ | ------------ |
| `ebook`             | Ebook completo                             | $9.999       |
| `ebook_auditoria`   | Ebook + Auditoría Digital Personalizada    | $29.998      |

Los precios están definidos en `app/api/checkout/route.ts`. Para cambiarlos,
modificar el objeto `PRODUCTS` en ese archivo.

## Deploy en Vercel

1. Subir el repositorio a GitHub (o el proveedor Git que uses).
2. En [vercel.com](https://vercel.com), importar el repositorio.
3. En **Project Settings → Environment Variables**, agregar:
   - `MERCADOPAGO_ACCESS_TOKEN`
   - `MERCADOPAGO_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (la URL de producción, ej.
     `https://tu-dominio.com`)
   - `NEXT_PUBLIC_META_PIXEL_ID`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `ADMIN_NOTIFICATION_EMAIL`,
     `EBOOK_DOWNLOAD_URL`
   - `NEXT_PUBLIC_WHATSAPP_URL`
   - `DATABASE_URL` (se completa sola si creás la base desde la pestaña
     **Storage** del mismo proyecto en Vercel)
4. Deploy. Vercel detecta automáticamente que es un proyecto Next.js.

Importante: `NEXT_PUBLIC_SITE_URL` debe apuntar al dominio real de producción
para que las `back_urls` de MercadoPago (`/gracias`, `/error`, `/pendiente`)
redirijan correctamente después del pago.

## Imágenes y optimización

Todas las imágenes de la landing (mockups, bonos, lifestyle, etc.) se sirven
con `next/image`, que las optimiza y convierte automáticamente en tiempo de
build/request. Aun así, conviene no subir a `public/` archivos fuente
gigantes: las imágenes generadas por IA suelen venir en 2000px+ de lado y
varios MB cada una, lo que infla el repo y ralentiza el build.

Para reemplazar cualquier imagen (por ejemplo, con una nueva versión generada
por IA):

1. Guardá el archivo nuevo como `.png` en `public/` con el mismo nombre base
   que tiene actualmente en el código (ej. `bonus-1.png`, `lifestyle-2.png`).
2. Corré:

   ```bash
   npm run optimize-images
   ```

   Esto redimensiona cada imagen (máx. 1600px de lado), la comprime a JPEG
   de alta calidad y borra el `.png` original, dejando el `.jpg` optimizado
   que ya está referenciado en los componentes.
3. Si agregás una imagen **nueva** (nombre de archivo que no existe todavía),
   sumala a la lista `files` en `scripts/optimize-images.mjs` antes de correr
   el comando.

Lista completa de imágenes usadas: `ebook-mockup`, `lifestyle-1/2/3`,
`feature-presencia-digital`, `preview-1/2/3/4`, `bonus-1..5`,
`auditoria-mockup`, `device-showcase`, `thumb-1..4` (todas `.jpg`).
