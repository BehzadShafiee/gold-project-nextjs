import mongoose from "mongoose";

const sellSchema = new mongoose.Schema({
  order_type: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  submit_product: {
    type: Number,
    required: true,
    default: 0
  },
  product_name: {
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

export const Sell = mongoose.models.Sell || mongoose.model("Sell", sellSchema);
