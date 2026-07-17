const ITEMS = [
  "Mirás tu agenda un lunes y hay más huecos que turnos.",
  "Sabés que sos bueno en lo tuyo, pero los pacientes nuevos no llegan.",
  "Tenés Instagram pero no genera consultas.",
  "Perdés pacientes porque no podés atender el teléfono a todas horas.",
  "Querés crecer sin depender de publicidad cara ni de agencias.",
];

export default function QualifySection() {
  return (
    <section className="bg-navy-medium px-6 py-20 fade-in-section">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-10 text-center">
          Si te identificás con esto, estás en el lugar correcto.
        </h2>
        <ul className="space-y-5">
          {ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 text-gold text-lg">✓</span>
              <span className="text-graylight text-base md:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
