import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: { type: [Object], required: true },
    name: String,
    email: String,
    phoneNumber: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    method: String,
  },
  {
    timestamps: true,
  }
);

export const Order = models.Order || model("Order", OrderSchema);
