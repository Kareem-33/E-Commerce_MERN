import express, { Request, Response } from "express";
import { addItemToCart, getActiveCart, editItemInCart, deleteItemFromCart, clearCartItems, checkout } from "../services/cart.service";
import validateJWT from "../middlewares/validateJWT";
import ExtendedRequest from "../interfaces/extendedRequest.interface";

const cartRouter = express.Router();

cartRouter.get(
  "/",
  validateJWT,
  async (req: ExtendedRequest, res: Response) => {
    const userId = req.user.id;
    const cart = await getActiveCart({ userId });
    res.status(200).send(cart);
  }
);

cartRouter.post(
  "/items",
  validateJWT,
  async (req: ExtendedRequest, res: Response) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).json(response);
  }
);

cartRouter.put(
  "/items",
  validateJWT,
  async(req:ExtendedRequest, res:Response) => {
    const userId = req.user.id;
    const {productId, quantity} = req.body;
    const response = await editItemInCart({userId, productId, quantity});
    res.status(response.statusCode).json(response);
  }
);

cartRouter.delete(
  "/items",
  validateJWT,
  async(req:ExtendedRequest, res:Response) => {
    const userId = req.user.id;
    const {productId} = req.body;
    const response = await deleteItemFromCart({userId, productId});
    res.status(response.statusCode).json(response);
  }
);

cartRouter.delete( "/", validateJWT, async(req:ExtendedRequest, res:Response) => {
  const userId = req.user.id;
  const response = await clearCartItems({userId});
  res.status(response.statusCode).json(response);
});

cartRouter.post("/checkout", validateJWT, async (req:ExtendedRequest, res:Response) => {
  const userId = req.user.id;
  const {address} = req.body;
  const response = await checkout({userId, address});
  res.status(response.statusCode).json(response);
})

export default cartRouter;
