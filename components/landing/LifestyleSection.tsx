import Image from "next/image";
import CheckoutButton from "@/components/CheckoutButton";
import LastSpotsBadge from "@/components/landing/LastSpotsBadge";

const CARDS = [
  {
    image: "/doctor-frustrated.jpg",
    title: "Cansado de improvisar",
    subtitle: "Tu consultorio vacío",
  },
  {
    image: "/hero-doctor.jpg",
    title: "Organizá tu presencia",
    subtitle: "Sistema digital en orden",
  },
  {
    image: "/waiting-room.jpg",
    title: "Ahorrá tiempo",
    subtitle: "Turnos que llegan solos",
  },
];

export default function LifestyleSection() {
  return (
    <section className="px-6 py-20 fade-in-section">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          De la agenda vacía a un sistema simple que funciona.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="group relative h-80 overflow-hidden rounded-xl border border-gold/10"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <LastSpotsBadge className="bg-navy/80 backdrop-blur-sm" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-gold text-xs font-semibold uppercase tracking-wide mb-1">
                  {card.subtitle}
                </p>
                <h3 className="font-serif text-xl font-bold text-white mb-4">
                  {card.title}
                </h3>
                <CheckoutButton
                  tipo="ebook"
                  className="w-full rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy hover:opacity-90 transition"
                >
                  Obtené acceso
                </CheckoutButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
