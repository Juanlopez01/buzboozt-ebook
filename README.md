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

   Si dejás `MERCADOPAGO_WEBHOOK_SECRET` o `NEXT_PUBLIC_META_PIXEL_ID` sin
   completar, esas funciones quedan desactivadas sin romper el resto de la
   página (el checkout y el resto del sitio siguen funcionando igual).

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
- `components/CheckoutButton.tsx` — botón client-side que llama a
  `/api/checkout` y redirige al usuario.
- `components/MetaPixel.tsx` — script base del Meta Pixel (se inyecta en
  `app/layout.tsx`, dispara `PageView` en toda la página).
- `components/PurchaseEvent.tsx` — dispara el evento `Purchase` en
  `/gracias`, una sola vez por pago (evita duplicados en refresh).

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
3. Loguea el resultado (`id`, `status`, `external_reference`,
   `transaction_amount`, `payer.email`).

**Lo que falta decidir:** ahora mismo el webhook solo loguea el pago
aprobado — no hay base de datos ni servicio de email conectados a este
proyecto todavía. Para completar el flujo de entrega automática del ebook
hay que:
- Elegir dónde persistir las órdenes (ej. una tabla en Postgres/Supabase).
- Elegir un servicio de email transaccional (ej. Resend, SendGrid) para
  mandar el link de descarga automáticamente cuando `status === "approved"`.

Hasta que eso esté, la entrega del ebook depende de revisar los logs (o el
propio panel de MercadoPago) y mandarlo manualmente.

## Meta Pixel (tracking de conversión para ads)

Con `NEXT_PUBLIC_META_PIXEL_ID` configurado, el Pixel se carga en todas las
páginas (evento `PageView`) y dispara `Purchase` en `/gracias` **solo si el
pago fue verificado como aprobado contra la API de MercadoPago** (no confía
en los parámetros de la URL, que un usuario podría manipular). El monto
enviado al pixel es el monto real cobrado, no el que se muestra en el
frontend.

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
   - `NEXT_PUBLIC_SITE_URL` (la URL de producción, ej.
     `https://tu-dominio.com`)
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
