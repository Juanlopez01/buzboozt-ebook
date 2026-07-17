import Image from "next/image";
import CheckoutButton from "@/components/CheckoutButton";
import LastSpotsBadge from "@/components/landing/LastSpotsBadge";

export default function Hero() {
  return (
    <section className="px-6 pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
        <span className="font-serif text-2xl md:text-3xl font-bold text-gold mb-8">
          buzBoozt
        </span>

        <span className="mb-6 inline-block rounded-full border border-gold/40 px-4 py-1.5 text-xs md:text-sm tracking-wide text-gold">
          GUÍA PROFESIONALES DE LA SALUD · VOL. 01 · 2026
        </span>

        <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-white mb-6">
          De consultorio vacío
          <br />
          a lista de espera
          <br />
          en 12 semanas.
        </h1>

        <p className="text-graylight text-base md:text-lg leading-relaxed mb-10">
          — Sin saber de marketing.
          <br />
          — Sin aparecer en cámara.
          <br />
          — Sin invertir miles de pesos.
        </p>

        <div className="mb-10 w-full max-w-sm">
          <Image
            src="/ebook-mockup.jpg"
            alt="Mockup del ebook De Consultorio Vacío a Lista de Espera en 12 Semanas"
            width={1289}
            height={1600}
            priority
            sizes="(min-width: 384px) 384px, 100vw"
            className="w-full h-auto rounded-lg border border-gold/20 bg-navy-medium"
          />
        </div>

        <div className="mb-10 grid grid-cols-3 gap-6 w-full max-w-xl">
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="text-sm text-graylight">4 Módulos completos</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl">📄</span>
            <span className="text-sm text-graylight">62 páginas accionables</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl">🎁</span>
            <span className="text-sm text-graylight">5 Bonuses incluidos</span>
          </div>
        </div>

        <div className="mb-4">
          <LastSpotsBadge />
        </div>

        <CheckoutButton
          tipo="ebook"
          className="rounded-lg bg-gold px-10 py-4 font-sans text-lg font-semibold text-navy hover:opacity-90 transition"
        >
          Quiero el método → $9.999 ARS
        </CheckoutButton>

        <p className="mt-4 text-xs text-graylight">
          Acceso inmediato · Pago seguro · Garantía 7 días
        </p>
      </div>
    </section>
  );
}
