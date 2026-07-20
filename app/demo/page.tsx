import type { Metadata } from "next";
import Link from "next/link";
import AdminDemo from "@/components/AdminDemo";

export const metadata: Metadata = {
  title: "Demo interactiva del panel · Buzboozt",
  description:
    "Probá en vivo el panel de administración que armamos para consultorios de salud: turnos, pacientes, ficha clínica y agenda.",
};

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola! Vi la demo interactiva y quiero consultar por el servicio de web premium."
);

export default function DemoPage() {
  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/543624804761";
  const whatsappHref = `${whatsappUrl}?text=${WHATSAPP_MESSAGE}`;

  return (
    <main className="min-h-screen flex flex-col bg-navy">
      <header className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gold/10">
        <Link
          href="/"
          className="font-serif text-lg sm:text-xl font-bold text-gold"
        >
          buzBoozt
        </Link>
        <Link
          href="/"
          className="text-graylight text-xs sm:text-sm hover:text-gold transition"
        >
          ← Volver a la landing
        </Link>
      </header>

      <div className="text-center px-4 pt-4 sm:pt-6">
        <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
          Probá el panel en vivo.
        </h1>
        <p className="text-graylight text-xs sm:text-sm">
          Datos ficticios de ejemplo — elegí tu especialidad y explorá cada
          sección.
        </p>
      </div>

      <div className="flex-1 min-h-0 px-3 sm:px-6 py-4 sm:py-6">
        <div className="mx-auto max-w-6xl h-full min-h-[520px] rounded-xl overflow-hidden border border-gold/20">
          <AdminDemo />
        </div>
      </div>

      <footer className="flex-shrink-0 border-t border-gold/10 px-4 sm:px-6 py-5 text-center">
        <p className="text-graylight text-xs sm:text-sm mb-3">
          Esto es lo que armamos a medida para tu consultorio.
        </p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-gold px-6 py-2.5 sm:px-8 sm:py-3 font-sans text-sm sm:text-base font-semibold text-navy hover:opacity-90 transition"
        >
          Quiero esto para mi consultorio
        </a>
      </footer>
    </main>
  );
}
