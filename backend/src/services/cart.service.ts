import { ObjectId } from "mongoose";
import cartModel from "../models/cart.model";
import productModel from "../models/product.model";
import { ICartItem } from "../interfaces/cart.interface";

interface createNewCartProps{
  userId: ObjectId | string,
}

const createNewCart = async({userId}: createNewCartProps) => {
  const cart = new cartModel({userId});
  await cart.save();
  return cart;
}

interface getActiveCartProps{
  userId: ObjectId | string,
}

export const getActiveCart = async ({userId}: getActiveCartProps) => {
  let cart = await cartModel.findOne({userId, status: "active"});
  if(!cart){
    cart = await createNewCart({userId});
  }
  return cart;
}

interface addItemToCartProps{
  productId: ObjectId | string,
  quantity: number,
  userId: ObjectId | string,
}

export const addItemToCart = async({productId, quantity, userId}:addItemToCartProps) => {
  const cart = await getActiveCart({userId});

  if (!cart) {
    return { success: false, message: "Cart not found", statusCode: 400 };
  }

  // Find if the product already exists in the cart
  const existInCart = cart.items.find((p: any) => p.productId.toString() === productId.toString());
  if (existInCart) {
    existInCart.quantity += quantity;
    cart.totalAmount += existInCart.unitPrice * quantity;
    const updatedCart = await cart.save();
    return { success: true, message: "Quantity updated", statusCode: 200, cart: updatedCart };
  }

  const product = await productModel.findOne({ _id: productId });
  if (!product) {
    return { success: false, message: "Product not found", statusCode: 400 };
  }
  if(product.stock < quantity){
    return {success: false, message: "Low stock for item", statusCode: 400};
  }
  cart.items.push({ productId, quantity, unitPrice: product.price });
  cart.totalAmount += product.price * quantity;
  const updatedCart = await cart.save();
  return { success: true, message: "Product added to cart", statusCode: 200, cart: updatedCart};
}

interface editItemInCartProps{
  userId: ObjectId | string,
  productId: ObjectId | string,
  quantity: number,
}

export const editItemInCart = async ({userId, productId, quantity}:editItemInCartProps) => {
  const cart = await getActiveCart({userId});
  if (!cart) {
    return { success: false, message: "Cart not found", statusCode: 400 };
  }
  const existInCart = cart.items.find((p) => p.productId.toString() === productId.toString());
  if(!existInCart){
    return {success: false, message: "Product does not exist in cart", statusCode: 400};
  }
  const product = await productModel.findOne({ _id: productId });
  if (!product) {
    return { success: false, message: "Product not found", statusCode: 400 };
  }
  if(product.stock < quantity){
    return {success: false, message: "Low stock for item", statusCode: 400};
  }
  existInCart.quantity = quantity;
  cart.totalAmount = 0;
  cart.items.forEach((p) => {cart.totalAmount+=p.unitPrice*p.quantity});
  const updatedCart = await cart.save();
  return {success: true, message: "Cart updated successfully", cart:updatedCart, statusCode: 200};
}

interface deleteItemFromCartProps{
  userId: ObjectId | string,
  productId: ObjectId | string,
}

export const deleteItemFromCart = async ({userId, productId}: deleteItemFromCartProps) => {
  const cart = await getActiveCart({userId});
  if(!cart){
    return {success: false, message: "Cart not found", statusCode: 400};
  }
  const cartItem = cart.items.find(p => p.productId.toString() === productId.toString());
  if(!cartItem){
    return {success: false, message: "Product doesn't exist in cart", statusCode: 400};
  }
  cart.totalAmount -= cartItem.unitPrice * cartItem.quantity;
  cart.items = cart.items.filter(p => p.productId.toString() !== productId.toString());
  const updatedCart = await cart.save();
  return {success: true, message: "Item deleted successfully", statusCode: 200, cart: updatedCart};
}

export const clearCartItems = async ({userId}: {userId: ObjectId | string}) => {
    const cart = await getActiveCart({userId});
  if(!cart){
    return {success: false, message: "Cart not found", statusCode: 400};
  }
  cart.totalAmount = 0;
  cart.items = [];
  const updatedCart = await cart.save();
  return {success: true, message: "Cart cleared successfully", statusCode: 200, cart: updatedCart};
}