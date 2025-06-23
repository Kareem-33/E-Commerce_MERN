import { Document } from "mongoose";

interface IUser extends Document{
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export default IUser;