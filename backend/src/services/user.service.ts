import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.model";
import generateJWT from "../utils/geterateJWT";

interface ISignupParams{
  name: string,
  email: string,
  password: string,
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as ISignupParams;
  const userExists = await userModel.findOne({email});
  try{
    if(!name || !email || !password){
      return res.status(400).json({success: false, message:"All fields are required"});
    }
    if(userExists){
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({name, email, password: hashedPassword});
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: generateJWT({id:user._id, name: user.name, email: user.email}),
    }) 
  }catch(error){
    return res.status(500).json({ success: false, message: `Internal server error: ${error}` });
  }
}

interface ILoginParams{
  email: string,
  password: string,
}

export const login = async (req:Request, res:Response) => {
  const {email, password} = req.body as ILoginParams;
  try{
    const user = await userModel.findOne({email});
    if(!user || !user.password){
      return res.status(400).json({success: false, message:"Invalid credentials"});
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
      return res.status(400).json({success: false, message:"Invalid credentials"});
    }
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: generateJWT({id:user._id, name: user.name, email: user.email}),
    })
  }
  catch(error){
    return res.status(400).json({success: false, message: `Internal server error: ${error}`})
  }
}