import cartModel from "../models/cart.model";

interface createNewCartProps{
  userId: string,
}

const createNewCart = async({userId}: createNewCartProps) => {
  const cart = new cartModel({userId});
  await cart.save();
  return cart;
}

interface getActiveCartProps{
  userId: string,
}

export const getActiveCart = async ({userId}: getActiveCartProps) => {
  let cart = await cartModel.findOne({userId, status: "active"});
  if(!cart){
    cart = await createNewCart({userId});
  }
  return cart;
}