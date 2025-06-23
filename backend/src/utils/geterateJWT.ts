import { IUser } from "../interfaces/user.interface"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateJWT = (data:any) => {
  return jwt.sign(data, process.env.SECRET_KEY as string, {expiresIn: "7d"});
}

export default generateJWT;