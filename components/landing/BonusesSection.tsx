import Image from "next/image";
import CheckoutButton from "@/components/CheckoutButton";
import LastSpotsBadge from "@/components/landing/LastSpotsBadge";

const BONUSES = [
  {
    label: "BONO 1",
    title: "101 ganchos para tu consultorio en redes",
    value: 8999,
    image: "/bonus-1.jpg",
  },
  {
    label: "BONO 2",
    title: "Plantillas de WhatsApp listas para usar",
    value: 6999,
    image: "/bonus-2.jpg",
  },
  {
    label: "BONO 3",
    title: "Calendario 90 días de contenido",
    value: 9999,
    image: "/bonus-3.jpg",
  },
  {
    label: "BONO 4",
    title: "Scripts para cerrar primera consulta",
    value: 7999,
    image: "/bonus-4.jpg",
  },
  {
    label: "BONO 5",
    title: "Grupo privado de Telegram con la comunidad",
    value: 5999,
    image: "/bonus-5.jpg",
  },
];

function formatARS(value: number) {
  return `$${value.toLocaleString("es-AR")}`;
}

export default function BonusesSection() {
  const total = BONUSES.reduce((sum, b) => sum + b.value, 0);

  return (
    <section className="bg-navy-medium px-6 py-20 fade-in-section">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Un set completo para implementar en 12 semanas.
        </h2>

        <div className="rounded-xl border border-gold bg-navy p-8 mb-10 max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-gold px-3 py-1 text-xs font-semibold text-navy mb-4">
            PRODUCTO PRINCIPAL
          </span>
          <h3 className="font-serif text-2xl font-bold text-white mb-3">
            Ebook Premium · 62 páginas
          </h3>
          <p className="text-graylight">
            Plan paso a paso con acciones concretas al final de cada
            capítulo. Sin teoría: solo lo que funciona en consultorios reales
            de Argentina.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {BONUSES.map((bonus) => (
            <div
              key={bonus.label}
              className="rounded-xl bg-navy border border-gold/10 overflow-hidden hover:border-gold/40 transition"
            >
              <div className="relative w-full h-48">
                <Image
                  src={bonus.image}
                  alt={bonus.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="mb-3">
                  <LastSpotsBadge />
                </div>
                <span className="inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold mb-3">
                  {bonus.label}
                </span>
                <p className="text-white font-medium mb-4">{bonus.title}</p>
                <div className="flex items-center justify-between">
                  <span className="text-graylight line-through text-sm">
                    {formatARS(bonus.value)}
                  </span>
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-gold font-bold text-sm">
                    GRATIS
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <p className="text-graylight">
            Total en bonuses: <span className="line-through">{formatARS(total)}</span>
          </p>
          <p className="text-gold font-semibold text-lg">
            Hoy los llevás GRATIS
          </p>
        </div>

        <div className="flex justify-center">
          <CheckoutButton
            tipo="ebook"
            className="rounded-lg bg-gold px-10 py-4 font-sans text-lg font-semibold text-navy hover:opacity-90 transition"
          >
            Quiero el método + todos los bonuses → $9.999 ARS
          </CheckoutButton>
        </div>
      </div>
    </section>
  );
}
