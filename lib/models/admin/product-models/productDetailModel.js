import mongoose from "mongoose";

const productDetailSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  // attributes is an array of dynamic key/value data
  attributes: [
    {
      key: { type: String, required: true },
      value: { type: mongoose.Schema.Types.Mixed, required: true },
      unit: { type: String },
      calculateOnPrice: { type: Boolean, default: false },
      operator: { type: String, enum: ['+', '-', '*', '/', 'none'], default: 'none' },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const ProductDetail = mongoose.models.ProductDetail || mongoose.model('ProductDetail', productDetailSchema);