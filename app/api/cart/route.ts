import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export async function POST(req: NextRequest) {
  await mongooseConnect();
  const { ids } = await req.json();
  const products = await Product.find({ _id: ids });
  return NextResponse.json(products);
}
