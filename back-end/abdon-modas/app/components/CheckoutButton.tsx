// abdon-modas/app/components/CheckoutButton.tsx
"use client"

import { useState } from "react";

interface CheckoutItem {
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulação de itens do carrinho
      const items: CheckoutItem[] = [
        {
          name: "Camiseta Premium",
          description: "Camiseta de qualidade premium",
          price: 50.0, // em reais
          quantity: 1,
        },
      ];

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          email: "cliente@example.com",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao processar pagamento");
      }

      const data = await response.json();

      // Redirecionar para Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Erro no checkout:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Processando..." : "Ir para pagamento"}
      </button>
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}
