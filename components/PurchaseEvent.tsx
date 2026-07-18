"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

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
    const metaFiredKey = `purchase_fired_meta_${eventId}`;
    if (!sessionStorage.getItem(metaFiredKey) && typeof window.fbq === "function") {
      window.fbq(
        "track",
        "Purchase",
        { value, currency },
        { eventID: eventId }
      );
      sessionStorage.setItem(metaFiredKey, "1");
    }

    const gaFiredKey = `purchase_fired_ga_${eventId}`;
    if (!sessionStorage.getItem(gaFiredKey)) {
      sendGAEvent("event", "purchase", {
        transaction_id: eventId,
        value,
        currency,
      });
      sessionStorage.setItem(gaFiredKey, "1");
    }
  }, [value, currency, eventId]);

  return null;
}
