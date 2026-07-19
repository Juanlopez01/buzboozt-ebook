"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 300;

export default function MobileFloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("has-mobile-cta", visible);
    return () => document.body.classList.remove("has-mobile-cta");
  }, [visible]);

  const handleClick = () => {
    document
      .getElementById("precio-final")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Quiero el método por $9.999 ARS"
      className={`fixed bottom-0 left-0 right-0 z-50 block md:hidden bg-gold p-4 text-center font-sans text-[15px] font-semibold text-navy ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        transition: "transform 0.3s ease",
        paddingBottom: "calc(16px + env(safe-area-inset-bottom))",
      }}
    >
      Quiero el método · $9.999 ARS
    </button>
  );
}
