import express from "express";
import { getProduct, getProducts } from "../services/product.service";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await getProducts();
  res.status(200).send(products);
})

productRouter.get("/:productId", async (req, res) => {
  const productId = req.params.productId;
  const response = await getProduct({productId});
  res.status(response.statusCode).json(response);
})

export default productRouter;