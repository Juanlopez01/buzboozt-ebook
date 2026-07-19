import Image from "next/image";

const POINTS = [
  {
    title: "Estructura semanal",
    description: "Sabés exactamente qué publicar y cuándo.",
  },
  {
    title: "Todo en tu idioma",
    description: "Sin jerga técnica ni pasos innecesarios.",
  },
  {
    title: "Resultados sostenibles",
    description: "Un sistema que se mantiene solo, no una campaña puntual.",
  },
];

export default function FeatureSection() {
  return (
    <section className="bg-navy-medium px-6 py-20 fade-in-section">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <Image
          src="/nutritionist.jpg"
          alt="Organizá tu presencia digital"
          width={1024}
          height={1024}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="w-full h-auto rounded-xl border border-gold/20"
        />
        <div>
          <span className="inline-block rounded-full bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold mb-5">
            EL MÉTODO
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-5">
            Un sistema progresivo para llenar tu agenda sin complicarte.
          </h2>
          <p className="text-graylight mb-8">
            No es teoría de marketing genérica: es la secuencia exacta que
            usan consultorios reales en Argentina para pasar de la
            improvisación a tener pacientes agendados semana a semana.
          </p>
          <ul className="space-y-5">
            {POINTS.map((point) => (
              <li key={point.title} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 text-gold text-lg">✓</span>
                <div>
                  <p className="text-white font-medium">{point.title}</p>
                  <p className="text-graylight text-sm">{point.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
