import express, { Request, Response } from "express";
import { getActiveCart } from "../services/cart.service";
import validateJWT from "../middlewares/validateJWT";

interface ExtendedRequest extends Request{
  user?: any;
}

const cartRouter = express.Router();

cartRouter.get("/",
  async(req, res, next) =>{
  validateJWT(req,res,next);
  },
  async (req: ExtendedRequest, res: Response) => {
  const userId = req.user.id;
  const cart = await getActiveCart({userId});
  res.status(200).send(cart);
  }
)

export default cartRouter;