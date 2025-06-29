import mongoose, {Schema} from "mongoose";
import { ICartItem, ICart } from "../interfaces/cart.interface";

const cartStatusEnum = ["active", "completed"];

const cartItemSchema = new Schema<ICartItem>({
  productId: {type: Schema.Types.ObjectId, ref:"product", required: true},
  quantity: {type: Number, default: 1, required: true},
  unitPrice: {type: Number, required: true},
})

const cartSchema = new Schema<ICart>({
  userId: {type: Schema.Types.ObjectId, ref:"user", required: true},
  items: [cartItemSchema],
  totalAmount: {type: Number, required:true, default: 0},
  status: {type: String, enum: cartStatusEnum, default: "active"},
})

const cartModel = mongoose.model<ICart>("cart", cartSchema);
export default cartModel;