import mongoose, { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export const Comment = models.Comment || model("Comment", CommentSchema);
