import express from "express";
import { getProducts } from "../services/product.service";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await getProducts();
  res.status(200).send(products);
})

export default productRouter;