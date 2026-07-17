import Image from "next/image";
import CheckoutButton from "@/components/CheckoutButton";

const PREVIEWS = [
  {
    image: "/preview-1.jpg",
    tag: "MÓDULO 01",
    title: "Google Mi Negocio",
    description: "La ficha que trae pacientes mientras dormís.",
  },
  {
    image: "/preview-2.jpg",
    tag: "MÓDULO 02",
    title: "Reel sin cámara",
    description: "Contenido que se hace en minutos, sin salir en pantalla.",
  },
  {
    image: "/preview-3.jpg",
    tag: "MÓDULO 03",
    title: "Recordatorio automático",
    description: "El mensaje que reduce las ausencias a la mitad.",
  },
  {
    image: "/preview-4.jpg",
    tag: "MÓDULO 04",
    title: "Sistema de referidos",
    description: "Cómo hacer que tus pacientes te traigan pacientes.",
  },
];

export default function PreviewSection() {
  return (
    <section className="px-6 py-20 fade-in-section">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3 text-center">
          Probá antes de comprar — 4 vistazos reales.
        </h2>
        <p className="text-graylight text-center mb-12">
          Así se ven algunas de las herramientas que vas a implementar.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PREVIEWS.map((preview) => (
            <div
              key={preview.title}
              className="rounded-xl bg-navy-medium border border-gold/10 overflow-hidden"
            >
              <div className="relative w-full h-56">
                <Image
                  src={preview.image}
                  alt={preview.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-gold text-xs font-semibold tracking-wide">
                  {preview.tag}
                </span>
                <h3 className="font-serif text-lg font-bold text-white mt-1 mb-2">
                  {preview.title}
                </h3>
                <p className="text-graylight text-sm mb-4">
                  {preview.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <CheckoutButton
            tipo="ebook"
            className="rounded-lg bg-gold px-8 py-3 font-sans font-semibold text-navy hover:opacity-90 transition"
          >
            Ver todos los módulos completos
          </CheckoutButton>
        </div>
      </div>
    </section>
  );
}
