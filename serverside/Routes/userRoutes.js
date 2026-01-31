import { Router } from "express";
import { add2Cart, deleteCartItem, getCartItems, Login, Logout,  SignUp } from "../ServerControllers/userControllers.js";
import authCheck from "../MiddleCheck/protectedAcces.js";

export const userRoutes = Router();

userRoutes.post('/register', SignUp);
userRoutes.post('/login', Login);
userRoutes.post('/logout', authCheck ,Logout);
userRoutes.post('/addtocart', authCheck,  add2Cart);
userRoutes.get('/mycart', authCheck,  getCartItems);
userRoutes.delete('/deletecartitem',  deleteCartItem);