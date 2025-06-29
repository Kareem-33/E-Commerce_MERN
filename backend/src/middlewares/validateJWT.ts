import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ExtendedRequest from "../interfaces/extendedRequest.interface";

const validateJWT = (req:ExtendedRequest, res:Response, next:NextFunction) => {
  const authorizationHeader = req.get("authorization");
  if(!authorizationHeader){
    res.status(403).json({success: false, message: "Authorization header not provided"});
    return;
  }

  const token = authorizationHeader.split(" ")[1];
  if(!token){
    res.status(403).json({success:false, message: "Token not provided"});
    return;
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (err, payload) => {
    if(err){
      res.status(403).json({success:false, message: "Invalid token"});
      return;
    }
    if(!payload){
      res.status(403).json({success:false, message: "Invalid token"});
      return;
    }
    
    req.user = payload;
    next();
  });
}

export default validateJWT;