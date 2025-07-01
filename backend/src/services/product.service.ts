import { ObjectId } from "mongoose";
import productModel from "../models/product.model";

export const getProducts = async () => {
  return await productModel.find();
}

export const seedInitialProducts = async () => {
  const products = [
    {
      title: "Product 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer venenatis est non efficitur scelerisque. Nunc commodo lorem et elit porta.",
      color: "black",
      image: "https://m.media-amazon.com/images/I/51tiDpMbLkL._AC_SL1500_.jpg",
      price: 50000,
      stock: 20,
    },
    {
      title: "Product 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer venenatis est non efficitur scelerisque. Nunc commodo lorem et elit porta.",
      color: "black",
      image: "https://m.media-amazon.com/images/I/51tiDpMbLkL._AC_SL1500_.jpg",
      price: 50000,
      stock: 20,
    },
    {
      title: "Product 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer venenatis est non efficitur scelerisque. Nunc commodo lorem et elit porta.",
      color: "black",
      image: "https://m.media-amazon.com/images/I/51tiDpMbLkL._AC_SL1500_.jpg",
      price: 50000,
      stock: 20,
    },
    {
      title: "Product 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer venenatis est non efficitur scelerisque. Nunc commodo lorem et elit porta.",
      color: "black",
      image: "https://m.media-amazon.com/images/I/51tiDpMbLkL._AC_SL1500_.jpg",
      price: 50000,
      stock: 20,
    },
    {
      title: "Product 5",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer venenatis est non efficitur scelerisque. Nunc commodo lorem et elit porta.",
      color: "black",
      image: "https://m.media-amazon.com/images/I/51tiDpMbLkL._AC_SL1500_.jpg",
      price: 50000,
      stock: 20,
    },
    {
      title: "Product 6",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer venenatis est non efficitur scelerisque. Nunc commodo lorem et elit porta.",
      color: "black",
      image: "https://m.media-amazon.com/images/I/51tiDpMbLkL._AC_SL1500_.jpg",
      price: 50000,
      stock: 20,
    },
  ];
  
  const currentProducts = await getProducts();
  if(currentProducts.length === 0){
    await productModel.insertMany(products);
  }
}

export const getProduct = async ({productId}: {productId: ObjectId | string}) => {
  const product = productModel.findById(productId);
  if(!product){
    return {success: false, message:"Product not found", statusCode: 404};
  }
  return {success: true, message:"Product found successfully", statusCode: 200, product};
}