import mongoose, { Schema } from "mongoose";
import { IOrder, IOrderItem } from "../interfaces/order.interface";


const orderItemSchema = new Schema<IOrderItem>({
  title: {type: String, required: true},
  image: {type: String, required: true},
  unitPrice: {type: Number, required: true},
  quantity: {type: Number, required:true },
})

const orderSchema = new Schema<IOrder>({
  items: [orderItemSchema],
  totalAmount: {type: Number, default: 0},
  address: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, ref: "user", required: true},
})

const orderModel = mongoose.model<IOrder>("order", orderSchema);
export default orderModel;