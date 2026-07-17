"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface PurchaseEventProps {
  value: number;
  currency: string;
  eventId: string;
}

export default function PurchaseEvent({
  value,
  currency,
  eventId,
}: PurchaseEventProps) {
  useEffect(() => {
    const alreadyFiredKey = `purchase_fired_${eventId}`;
    if (sessionStorage.getItem(alreadyFiredKey)) return;

    if (typeof window.fbq === "function") {
      window.fbq(
        "track",
        "Purchase",
        { value, currency },
        { eventID: eventId }
      );
      sessionStorage.setItem(alreadyFiredKey, "1");
    }
  }, [value, currency, eventId]);

  return null;
}
