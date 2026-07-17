import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubo un problema con el pago · Buzboozt",
};

export default function ErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-red-400 text-3xl">
          ✕
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
          Hubo un problema con tu pago
        </h1>
        <p className="text-graylight text-lg mb-8">
          El pago no pudo completarse. No te preocupes, no se te realizó
          ningún cobro. Podés intentar de nuevo cuando quieras.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-gold px-8 py-3 font-sans font-semibold text-navy hover:opacity-90 transition"
        >
          Volver a intentar
        </Link>
      </div>
    </main>
  );
}
