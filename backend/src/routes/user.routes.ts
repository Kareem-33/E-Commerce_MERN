import express from "express";
import { login, signup } from "../services/user.service";

const userRoutes = express.Router();

userRoutes.post("/signup", (req, res) => {
  signup(req, res);
});
userRoutes.post("/login", (req, res) => {
  login(req, res);
});


export default userRoutes;