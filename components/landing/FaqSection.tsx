import FaqAccordion from "./FaqAccordion";

const FAQS = [
  {
    question: "¿Es un curso o un ebook?",
    answer:
      "Es un ebook interactivo de 62 páginas con acciones concretas al final de cada capítulo. Lo leés a tu ritmo y ejecutás mientras avanzás.",
  },
  {
    question: "¿Necesito saber de marketing o tecnología?",
    answer:
      "No. Está escrito específicamente para profesionales de la salud sin experiencia digital. Cada paso es simple y está explicado desde cero.",
  },
  {
    question: "¿Cuándo recibo el acceso?",
    answer:
      "Inmediatamente después de confirmar el pago. Recibís el link de descarga en tu email.",
  },
  {
    question: "¿Funciona para mi especialidad?",
    answer:
      "Sí. El método aplica para odontólogos, psicólogos, nutricionistas, médicos, kinesiólogos y cualquier profesional de la salud con consultorio propio.",
  },
  {
    question: "¿Tiene garantía?",
    answer:
      "Sí. Si en 7 días no estás conforme, te devolvemos el dinero sin preguntas.",
  },
  {
    question: "¿Qué es la Auditoría Digital?",
    answer:
      "Es una sesión de 30 minutos por videollamada donde revisamos juntos tu presencia digital actual y armamos un plan de acción personalizado. La coordinamos por WhatsApp después de tu compra.",
  },
];

export default function FaqSection() {
  return (
    <section className="px-6 py-20 fade-in-section">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Preguntas frecuentes.
        </h2>
        <FaqAccordion items={FAQS} />
      </div>
    </section>
  );
}
