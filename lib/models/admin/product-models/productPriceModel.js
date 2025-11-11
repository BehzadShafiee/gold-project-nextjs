import mongoose from "mongoose";

const productPriceSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  basePrice: { type: Number, required: true },
  priceUnit: { type: String, default: 'perGram' },
  currency: { type: String, default: 'IRR' },
  calculatedPrice: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export const ProductPrice = mongoose.models.ProductPrice || mongoose.model('ProductPrice', productPriceSchema);