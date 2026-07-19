"use client";

import { useEffect, useState } from "react";

const COUNTDOWN_SECONDS = 48 * 60 * 60;

function formatTime(totalSeconds: number): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default function UrgencyBar() {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    const deadline = Date.now() + COUNTDOWN_SECONDS * 1000;
    const tick = () => {
      setSecondsLeft(Math.max(0, Math.round((deadline - Date.now()) / 1000)));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-gold px-4 py-2 text-center text-sm font-semibold text-navy md:text-base">
      <span>⚡ Precio de lanzamiento: $9.999 ARS · Oferta por tiempo limitado</span>
      <span className="rounded bg-navy px-2 py-0.5 text-xs font-bold tabular-nums text-gold md:text-sm">
        {formatTime(secondsLeft)}
      </span>
    </div>
  );
}
