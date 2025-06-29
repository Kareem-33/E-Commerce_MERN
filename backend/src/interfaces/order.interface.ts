import {Document, ObjectId} from "mongodb";

export interface IOrderItem{
  title: string,
  image: string,
  unitPrice: number,
  quantity: number,
}

export interface IOrder extends Document{
  items: IOrderItem[],
  totalAmount: number,
  address: string,
  userId: ObjectId | string,
}