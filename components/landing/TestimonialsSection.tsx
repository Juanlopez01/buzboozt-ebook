const TESTIMONIALS = [
  {
    text: "Empecé a aplicar lo del módulo 1 y en dos semanas ya tenía mi ficha de Google con reseñas. Nunca pensé que era tan simple.",
    author: "M.L. · Nutricionista, CABA",
  },
  {
    text: "Los reels sin cámara me cambiaron la vida. Publico 3 por semana y mis pacientes me dicen que me ven en todos lados.",
    author: "P.R. · Kinesióloga, Rosario",
  },
  {
    text: "El sistema de turnos online redujo mis ausencias a la mitad. Literal. Los números no mienten.",
    author: "D.M. · Médico clínico, Córdoba",
  },
  {
    text: "Pensé que iba a ser otro ebook lleno de teoría. Tiene una acción al final de cada capítulo. Ejecuté todo en 8 semanas.",
    author: "C.A. · Psicóloga, Palermo",
  },
  {
    text: "Lo de los referidos me pareció una pavada hasta que lo hice. En un mes me llegaron 4 pacientes nuevos por recomendación.",
    author: "S.V. · Odontóloga, Belgrano",
  },
  {
    text: "Vale 10 veces lo que cuesta. Lo recomiendo a todos los colegas que conozco.",
    author: "F.B. · Nutricionista, Mendoza",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-navy-medium px-6 py-20 fade-in-section">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Lo que están diciendo.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="rounded-xl bg-navy border border-gold/10 p-6 flex flex-col"
            >
              <span className="text-gold mb-3 tracking-wide">★★★★★</span>
              <p className="text-graylight text-sm md:text-base mb-4 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-white text-sm font-medium">{t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
