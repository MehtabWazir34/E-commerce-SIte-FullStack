import { Router } from "express";
import { Login, Logout, SignUp } from "../ServerControllers/userControllers.js";
import authCheck from "../MiddleCheck/protectedAcces.js";

export const userRoutes = Router();

userRoutes.post('/register', SignUp)
userRoutes.post('/login', Login)
userRoutes.post('/logout', authCheck ,Logout)