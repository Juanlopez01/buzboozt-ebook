import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pago pendiente · Buzboozt",
};

export default function PendientePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold text-3xl">
          ⏳
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
          Tu pago está pendiente
        </h1>
        <p className="text-graylight text-lg mb-8">
          Estamos esperando la confirmación de tu medio de pago. En cuanto se
          acredite, vas a recibir el acceso al ebook por email. Esto puede
          demorar unas horas según el método elegido.
        </p>
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
