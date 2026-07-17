const CARDS = [
  {
    number: "01",
    title: "Tu consultorio en internet",
    items: [
      "Google Mi Negocio que trae pacientes solo",
      "Instagram profesional en 1 hora",
      "Web simple que convierte",
    ],
  },
  {
    number: "02",
    title: "Contenido que atrae pacientes",
    items: [
      "Los 3 tipos de contenido que venden",
      "Reels sin salir en cámara",
      "La frecuencia que sí funciona",
    ],
  },
  {
    number: "03",
    title: "Automatizá tu agenda",
    items: [
      "Sistema de turnos online 24hs",
      "Recordatorios automáticos por WhatsApp",
      "Formulario previo y respuestas auto",
    ],
  },
  {
    number: "04",
    title: "Pacientes que vuelven",
    items: [
      "La consulta de seguimiento que nadie hace",
      "Sistema de referidos que multiplica",
      "Métricas que importan de verdad",
    ],
  },
];

export default function LearnSection() {
  return (
    <section className="px-6 py-20 fade-in-section">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Lo que vas a aprender.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CARDS.map((card) => (
            <div
              key={card.number}
              className="rounded-xl bg-navy-medium border border-gold/10 p-8"
            >
              <span className="font-serif text-4xl font-bold text-gold">
                {card.number}
              </span>
              <h3 className="font-serif text-xl font-semibold text-white mt-2 mb-5">
                {card.title}
              </h3>
              <ul className="space-y-3">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 text-gold">•</span>
                    <span className="text-graylight text-sm md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
