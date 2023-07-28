import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import { Comment } from "@/models/comment";

export async function POST(req: NextRequest) {
  await mongooseConnect();
  const { id, productId, commentText } = await req.json();

  if (id.includes("@")) {
    const user = await User.findOne({ email: id });

    await Comment.create({
      creator: user._id,
      product: productId,
      text: commentText,
    });

    return NextResponse.json("successfully added");
  }

  await Comment.create({
    creator: id,
    product: productId,
    text: commentText,
  });

  return NextResponse.json("successfully added");
}

export async function GET(req: NextRequest) {
  await mongooseConnect();
  const comments = await Comment.find({}, null, { sort: { _id: -1 } });
  const users = await User.find();
  const completeData = comments.map((comment: any) => {
    const user = users.filter(
      (user: any) => user._id.toString() === comment.creator.toString()
    );
    return {
      user,
      comment,
    };
  });

  return NextResponse.json(completeData);
}

export async function PUT(req: NextRequest) {
  await mongooseConnect();
  const { id } = await req.json();
  await Comment.deleteOne({ _id: id });

  return NextResponse.json("ok");
}
