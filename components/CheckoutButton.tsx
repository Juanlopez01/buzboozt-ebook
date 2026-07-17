"use client";

import { useState } from "react";

type Tipo = "ebook" | "ebook_auditoria";

interface CheckoutButtonProps {
  tipo: Tipo;
  children: React.ReactNode;
  className?: string;
}

export default function CheckoutButton({
  tipo,
  children,
  className = "",
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo }),
      });

      if (!res.ok) {
        throw new Error("No se pudo iniciar el pago.");
      }

      const data = await res.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("Respuesta inválida del servidor.");
      }
    } catch (err) {
      setError("Hubo un problema al iniciar el pago. Intentá de nuevo.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className={className}
      >
        {loading ? "Redirigiendo..." : children}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
