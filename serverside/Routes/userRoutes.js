import { Router } from "express";
import { addToCart, Login, Logout, removeFromCart, SignUp } from "../ServerControllers/userControllers.js";
import authCheck from "../MiddleCheck/protectedAcces.js";

export const userRoutes = Router();

userRoutes.post('/register', SignUp);
userRoutes.post('/login', Login);
userRoutes.post('/logout', authCheck ,Logout);
userRoutes.post('/addtocart',  addToCart);
userRoutes.delete('/removefromcart', authCheck, removeFromCart);