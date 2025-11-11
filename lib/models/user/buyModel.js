import mongoose from "mongoose";

const buySchema = new mongoose.Schema({
  order_type: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  selected_product: {
    type: String,
    required: true,
  },
  weight_value: {
    type: Number,
    required: true,
  },
  weight_unit: {
    type: String,
    required: true,
  },
  price_value: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Buy = mongoose.models.Buy || mongoose.model("Buy", buySchema);
