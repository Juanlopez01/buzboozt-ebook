"use client";

import { useEffect, useState } from "react";

interface RecentOrder {
  displayName: string;
  product_type: string;
  created_at: string;
}

const PRODUCT_LABELS: Record<string, string> = {
  ebook: "el Ebook",
  ebook_auditoria: "el Ebook + Auditoría",
};

function timeAgo(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.max(1, Math.floor(diffMs / 60000));
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours} h`;
  const days = Math.floor(hours / 24);
  return `hace ${days} d`;
}

const DISMISS_KEY = "recent_purchase_notif_dismissed";
const VISIBLE_MS = 6000;
const GAP_MS = 4000;

export default function RecentPurchaseNotification() {
  const [orders, setOrders] = useState<RecentOrder[]>([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) {
      setDismissed(true);
      return;
    }

    fetch("/api/recent-orders")
      .then((res) => res.json())
      .then((data: { orders: RecentOrder[] }) => {
        if (data.orders?.length) setOrders(data.orders);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (dismissed || orders.length === 0) return;

    const showTimer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(showTimer);
  }, [orders, dismissed]);

  useEffect(() => {
    if (!visible) return;

    const hideTimer = setTimeout(() => setVisible(false), VISIBLE_MS);
    return () => clearTimeout(hideTimer);
  }, [visible]);

  useEffect(() => {
    if (visible || dismissed || orders.length === 0) return;

    const nextTimer = setTimeout(() => {
      setIndex((i) => (i + 1) % orders.length);
      setVisible(true);
    }, GAP_MS);
    return () => clearTimeout(nextTimer);
  }, [visible, dismissed, orders.length]);

  if (dismissed || orders.length === 0) return null;

  const order = orders[index];
  const productLabel = PRODUCT_LABELS[order.product_type] ?? "el Ebook";

  return (
    <div
      className={`fixed bottom-5 left-5 z-50 max-w-xs transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-start gap-3 rounded-xl border border-gold/20 bg-navy-medium p-4 shadow-lg">
        <span className="mt-0.5 flex-shrink-0 text-gold text-lg">✓</span>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium">
            {order.displayName} compró {productLabel}
          </p>
          <p className="text-graylight text-xs mt-0.5">
            {timeAgo(order.created_at)}
          </p>
        </div>
        <button
          onClick={() => {
            setVisible(false);
            setDismissed(true);
            sessionStorage.setItem(DISMISS_KEY, "1");
          }}
          aria-label="Cerrar"
          className="flex-shrink-0 text-graylight hover:text-white transition text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
