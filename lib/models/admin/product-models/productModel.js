import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String },
  category: { type: String },
  standard: { type: Number },
  related_order: { type: String , default: ''},
  from_customer: { type: Number , default: 0},
  weightOrNumber: {type: String , required: true},
  unit: {type: String , required: true , default: 'gr'},
  createdAt: { type: Date, default: Date.now },
});

productSchema.virtual('details', {
  ref: 'ProductDetail',
  localField: '_id',
  foreignField: 'product',
  justOne: true,
});

productSchema.virtual('prices', {
  ref: 'ProductPrice',
  localField: '_id',
  foreignField: 'product',
});

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

export const Product = mongoose.models.Product || mongoose.model('Product' , productSchema);