import Image from "next/image";

const THUMBS = [
  { image: "/thumb-1.jpg", title: "Reels que enamoran pacientes" },
  { image: "/thumb-2.jpg", title: "Turnos sin llamadas" },
  { image: "/thumb-3.jpg", title: "Recordatorios automáticos" },
  { image: "/thumb-4.jpg", title: "Pacientes que refieren pacientes" },
];

export default function DeviceShowcaseSection() {
  return (
    <section className="bg-navy-medium px-6 py-20 fade-in-section">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Disfrutalo en cualquier dispositivo.
        </h2>
        <Image
          src="/device-showcase.jpg"
          alt="El método en laptop, tablet y celular"
          width={1600}
          height={1073}
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="w-full h-auto rounded-xl border border-gold/20 mb-10"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {THUMBS.map((thumb) => (
            <div
              key={thumb.title}
              className="rounded-lg overflow-hidden border border-gold/10"
            >
              <div className="relative w-full h-32 sm:h-36">
                <Image
                  src={thumb.image}
                  alt={thumb.title}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="p-3 text-xs text-graylight text-center">
                {thumb.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
