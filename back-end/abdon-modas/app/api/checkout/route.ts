
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(request: NextRequest) {
  try {
    // Obter dados do carrinho da requisição
    const body = await request.json();
    const { items, email } = body;

    // Validação básica
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Carrinho vazio ou inválido" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    // Formatar itens para Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name || "Produto",
          description: item.description,
        },
        unit_amount: Math.round(item.price * 100), // converter para centavos
      },
      quantity: item.quantity || 1,
    }));

    // Obter origem da requisição
    const origin = request.headers.get("origin") || "http://localhost:5137";

    // Criar sessão Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      customer_email: email,
      success_url: `${origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancelado`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Erro Stripe:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao processar pagamento" },
      { status: 500 }
    );
  }
}