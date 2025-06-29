import { Document, ObjectId } from "mongoose";
import IProduct from "./product.interface";

export interface ICartItem {
  productId: ObjectId | string;
  unitPrice: number;
  quantity: number;
}

export interface ICart extends Document {
  userId: ObjectId | string;
  items: ICartItem[];
  totalAmount: number;
  status: "active" | "completed";
}
