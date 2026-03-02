import type { APIRoute } from "astro";
import Stripe from "stripe";
import { getProductById } from "../../lib/catalog";

const stripeSecretKey = import.meta.env.STRIPE_SECRET_KEY;

function jsonResponse(status: number, payload: Record<string, string>) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  if (!stripeSecretKey) {
    return jsonResponse(500, {
      error: "Falta configurar STRIPE_SECRET_KEY en el entorno del servidor.",
    });
  }

  let body: { productId?: string };
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { error: "Body invalido." });
  }

  const productId = body.productId?.trim();
  if (!productId) {
    return jsonResponse(400, { error: "productId es obligatorio." });
  }

  const product = getProductById(productId);
  if (!product || !product.stripePriceId) {
    return jsonResponse(400, {
      error: "Producto invalido o no configurado para pagos.",
    });
  }

  const stripe = new Stripe(stripeSecretKey);
  const successUrl = new URL("/success?session_id={CHECKOUT_SESSION_ID}", request.url).toString();
  const cancelUrl = new URL("/cancel", request.url).toString();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: product.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      metadata: {
        productId: product.id,
      },
    });

    if (!session.url) {
      return jsonResponse(500, { error: "Stripe no devolvio URL de checkout." });
    }

    return jsonResponse(200, { url: session.url });
  } catch (error) {
    console.error("Error creando Checkout Session:", error);
    return jsonResponse(500, { error: "No se pudo iniciar el checkout." });
  }
};
