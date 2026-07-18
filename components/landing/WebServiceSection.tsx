import AdminDemo from "@/components/AdminDemo";

const INCLUDES = [
  "Diseño 100% a medida para tu consultorio",
  "Dominio propio incluido",
  "Hosting incluido",
  "Base de datos para turnos y pacientes",
  "Pensada para que tus pacientes te encuentren y agenden solos",
  "Te acompañamos en toda la puesta en marcha",
  "Incluye el Ebook completo + los 5 bonuses de regalo",
];

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola! Quiero consultar por el servicio de web premium."
);

export default function WebServiceSection() {
  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/543624804761";
  const whatsappHref = `${whatsappUrl}?text=${WHATSAPP_MESSAGE}`;

  return (
    <section className="px-6 py-20 fade-in-section">
      <div className="mx-auto max-w-3xl rounded-2xl bg-navy-medium border border-gold p-5 sm:p-8 md:p-12">
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold mb-6">
            SERVICIO PREMIUM
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Querés que te lo armemos nosotros? Tu web profesional, lista.
          </h2>
          <p className="text-graylight max-w-xl mx-auto">
            Si preferís no implementarlo vos mismo, armamos tu consultorio
            online de punta a punta: diseño, dominio, hosting y base de
            datos, listo para que tus pacientes te encuentren y agenden
            solos.
          </p>
        </div>

        <div className="-mx-5 sm:-mx-8 md:-mx-12 h-[440px] sm:h-[480px] md:h-[560px] mb-3 rounded-xl overflow-hidden border border-gold/20">
          <AdminDemo />
        </div>
        <p className="text-graylight text-xs text-center mb-10">
          Demo interactiva — datos ficticios de ejemplo, no son pacientes reales.
        </p>

        <ul className="space-y-3 mb-10 max-w-md mx-auto">
          {INCLUDES.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 text-gold">✓</span>
              <span className="text-graylight">{item}</span>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <p className="font-serif text-4xl font-bold text-gold mb-2">
            $150.000 ARS
          </p>
          <p className="text-graylight text-sm mb-8">Pago único</p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-gold px-10 py-4 font-sans text-lg font-semibold text-navy hover:opacity-90 transition"
          >
            Consultar por WhatsApp
          </a>

          <p className="mt-4 text-xs text-graylight">
            Coordinamos los detalles directo por WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
