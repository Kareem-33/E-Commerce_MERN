import { Document } from "mongoose";

interface IProduct extends Document{
  title: string,
  description: string,
  color: string,
  size: string,
  image: string,
  price: number,
  stock: number,
}

export default IProduct;