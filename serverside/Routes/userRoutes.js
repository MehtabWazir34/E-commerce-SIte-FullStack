import { Router } from "express";
import { add2Cart, addToCart, getCartItems, Login, Logout, removeFromCart, SignUp } from "../ServerControllers/userControllers.js";
import authCheck from "../MiddleCheck/protectedAcces.js";

export const userRoutes = Router();

userRoutes.post('/register', SignUp);
userRoutes.post('/login', Login);
userRoutes.post('/logout', authCheck ,Logout);
userRoutes.post('/addtocart', authCheck,  add2Cart);
userRoutes.get('/mycart', authCheck,  getCartItems);
userRoutes.delete('/removefromcart', authCheck, removeFromCart);