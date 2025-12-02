import { Schema, model, Document } from "mongoose";
import { PRODUCT_CATEGORY } from "../utils/prodcuctCategory.enum";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdDate: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(PRODUCT_CATEGORY),
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

export default model<IProduct>("Product", ProductSchema);
