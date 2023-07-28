import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  password: { type: String },
});

export const User = models.User || model("User", UserSchema);
