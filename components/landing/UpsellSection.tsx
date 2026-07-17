import Image from "next/image";
import CheckoutButton from "@/components/CheckoutButton";

const INCLUDES = [
  "Revisión completa de tu presencia digital actual",
  "Plan de acción priorizado para tu especialidad",
  "Grabación de la sesión para que puedas volver a verla",
];

export default function UpsellSection() {
  return (
    <section className="px-6 py-20 fade-in-section">
      <div className="mx-auto max-w-2xl rounded-2xl bg-navy-medium border border-gold p-8 md:p-12 text-center">
        <Image
          src="/auditoria-mockup.jpg"
          alt="Auditoría Digital Personalizada"
          width={1600}
          height={1073}
          sizes="(min-width: 384px) 384px, 100vw"
          className="w-full h-auto max-w-sm mx-auto mb-8 rounded-lg border border-gold/20"
        />
        <span className="inline-block rounded-full bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold mb-6">
          PARA IR MÁS RÁPIDO
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-5">
          Auditoría Digital Personalizada
        </h2>
        <p className="text-graylight mb-8">
          Una sesión de 30 minutos donde revisamos juntos tu Google Mi
          Negocio, Instagram y web actual. Te decimos exactamente qué
          implementar primero según tu caso y cuánto tiempo te va a llevar.
        </p>
        <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
          {INCLUDES.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 text-gold">✓</span>
              <span className="text-graylight">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-3xl font-serif font-bold text-gold mb-8">
          $19.999 ARS
        </p>
        <CheckoutButton
          tipo="ebook_auditoria"
          className="rounded-lg border-2 border-gold px-8 py-3 font-sans font-semibold text-gold hover:bg-gold hover:text-navy transition"
        >
          Agregar auditoría a mi compra
        </CheckoutButton>
        <p className="mt-4 text-xs text-graylight">
          Podés agregarlo ahora o después de comprar el ebook.
        </p>
      </div>
    </section>
  );
}
