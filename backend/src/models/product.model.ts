import mongoose, { Schema } from "mongoose";
import IProduct from "../interfaces/product.interface";

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: String,
  color:String,
  size:String,
  image: { type: String, required: true},
  price: {type: Number, required: true},
  stock: {type: Number, required: true, default: 0},
})

const productModel = mongoose.model<IProduct>("product", productSchema);

export default productModel;