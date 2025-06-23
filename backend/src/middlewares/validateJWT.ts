import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

  interface ExtendedRequest extends Request{
    user?: any;
  }

const validateJWT = (req:ExtendedRequest, res:Response, next:NextFunction) => {
  const authorizationHeader = req.get("authorization");
  if(!authorizationHeader){
    return res.status(403).json({success: false, message: "Authorization header not provided"});
  }

  const token = authorizationHeader.split(" ")[1];
  if(!token){
    return res.status(403).json({success:false, message: "Token not provided"});
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (err, payload) => {
    if(err){
      return res.status(403).json({success:false, message: "Invalid token"});
    }
    if(!payload){
      return res.status(403).json({success:false, message: "Invalid token"});
    }
    
    req.user = payload;
    next();
  });
}

export default validateJWT;