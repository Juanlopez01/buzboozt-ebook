import Image from "next/image";
import CheckoutButton from "@/components/CheckoutButton";
import LastSpotsBadge from "@/components/landing/LastSpotsBadge";

const INCLUDES = [
  "Ebook completo 62 páginas",
  "5 Bonuses exclusivos ($39.995 en valor)",
  "Grupo privado de Telegram",
  "Garantía 7 días",
];

export default function FinalPriceSection() {
  return (
    <section className="px-6 py-24 fade-in-section bg-gradient-to-b from-navy to-navy-medium">
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-10 w-full max-w-xs mx-auto">
          <Image
            src="/ebook-mockup.jpg"
            alt="Mockup del ebook De Consultorio Vacío a Lista de Espera en 12 Semanas"
            width={1289}
            height={1600}
            sizes="(min-width: 320px) 320px, 100vw"
            className="w-full h-auto rounded-lg border border-gold/20 bg-navy-medium"
          />
        </div>

        <p className="text-graylight line-through text-lg mb-1">$24.999</p>
        <p className="font-serif text-5xl font-bold text-gold mb-2">
          $9.999 ARS
        </p>
        <p className="text-graylight text-sm mb-4">
          Pago único · Acceso de por vida
        </p>
        <div className="mb-8">
          <LastSpotsBadge />
        </div>

        <ul className="space-y-3 mb-10 text-left max-w-xs mx-auto">
          {INCLUDES.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 text-gold">✓</span>
              <span className="text-graylight">{item}</span>
            </li>
          ))}
        </ul>

        <CheckoutButton
          tipo="ebook"
          className="w-full rounded-lg bg-gold px-10 py-4 font-sans text-lg font-semibold text-navy hover:opacity-90 transition"
        >
          Quiero empezar hoy →
        </CheckoutButton>

        <p className="mt-4 text-xs text-graylight">
          Acceso inmediato · Pago seguro con MercadoPago
        </p>
      </div>
    </section>
  );
}
