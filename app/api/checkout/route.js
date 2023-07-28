import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { Order } from "@/models/Order";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SK, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export async function POST(req) {
  const {
    name,
    email,
    phoneNumber,
    city,
    postalCode,
    streetAddress,
    country,
    selectedProducts,
    method,
  } = await req.json();

  await mongooseConnect();

  const uniqueIds = [...new Set(selectedProducts)];
  const productsInfos = await Product.find({ _id: uniqueIds });
  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity =
      selectedProducts.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "EUR",
          product_data: { name: productInfo.title },
          unit_amount: productInfo.price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    phoneNumber,
    city,
    postalCode,
    streetAddress,
    country,
    method,
  });

  if (method === "Card payment") {
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: process.env.URL + "/cart?success=1",
      cancel_url: process.env.URL + "/cart?canceled=1",
      metadata: { orderId: orderDoc._id.toString() },
    });
    return NextResponse.json({
      url: session.url,
    });
  }

  return NextResponse.json({ url: "/cart?success=1" });
}
