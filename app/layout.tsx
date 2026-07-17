import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://buzboozt.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "De Consultorio Vacío a Lista de Espera · Buzboozt",
  description:
    "La guía para profesionales de la salud que quieren llenar su agenda en 12 semanas, sin saber de marketing, sin aparecer en cámara y sin invertir miles de pesos.",
  openGraph: {
    title: "De Consultorio Vacío a Lista de Espera · Buzboozt",
    description:
      "La guía para profesionales de la salud que quieren llenar su agenda en 12 semanas, sin saber de marketing, sin aparecer en cámara y sin invertir miles de pesos.",
    images: ["/ebook-mockup.jpg"],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "De Consultorio Vacío a Lista de Espera · Buzboozt",
    description:
      "La guía para profesionales de la salud que quieren llenar su agenda en 12 semanas.",
    images: ["/ebook-mockup.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-navy text-white antialiased">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
