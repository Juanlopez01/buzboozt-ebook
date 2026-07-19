"use client";

import { useEffect, useState } from "react";

const NOTIFICATIONS = [
  "M. González de Palermo",
  "L. Rodríguez de Córdoba",
  "C. Martínez de Rosario",
  "P. Sánchez de Belgrano",
  "A. López de Mendoza",
  "F. Torres de Caballito",
];

const INITIAL_DELAY_MS = 4000;
const VISIBLE_MS = 2000;
const CYCLE_MS = 30000;

export default function SocialProofPopup() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let current = 0;

    function show() {
      setIndex(current);
      setVisible(true);
      timeouts.push(setTimeout(() => setVisible(false), VISIBLE_MS));
    }

    function scheduleShow(delay: number) {
      timeouts.push(
        setTimeout(() => {
          current = (current + 1) % NOTIFICATIONS.length;
          show();
          scheduleShow(CYCLE_MS);
        }, delay)
      );
    }

    timeouts.push(
      setTimeout(() => {
        show();
        scheduleShow(CYCLE_MS);
      }, INITIAL_DELAY_MS)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={`fixed bottom-[70px] left-4 z-50 max-w-[280px] rounded-lg border-l-[3px] border-gold bg-navy-medium px-4 py-3 shadow-lg md:bottom-6 md:left-6 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
      style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
    >
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0 text-xl">📖</span>
        <p className="text-sm text-white">
          <span className="font-medium">{NOTIFICATIONS[index]}</span> acaba de
          comprar el método
        </p>
      </div>
    </div>
  );
}
