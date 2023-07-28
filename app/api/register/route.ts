import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  await mongooseConnect();
  const { username, email, password } = await req.json();

  const exists = await User.findOne({ email });

  if (exists) {
    return new NextResponse("email already exists!", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name: username,
    email,
    password: hashedPassword,
    image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  });

  return NextResponse.json("ok");
}
