import { Router } from "express";
import { add2Cart, deleteCartItem, getCartItems, getMe, Login, Logout,  SignUp } from "../ServerControllers/userControllers.js";
import authCheck from "../MiddleCheck/protectedAcces.js";
import { createOrder, getAllOrders, myOrders, updateOrderStatus } from "../ServerControllers/OrderCtrls.js";

export const userRoutes = Router();

userRoutes.post('/register', SignUp);
userRoutes.post('/login', Login);
userRoutes.get('/me', authCheck, getMe )
userRoutes.post('/logout', authCheck ,Logout);
userRoutes.post('/addtocart', authCheck,  add2Cart);
userRoutes.get('/mycart', authCheck,  getCartItems);
userRoutes.delete('/deletecartitem/:itemId', authCheck, deleteCartItem);
userRoutes.get('/protected', authCheck,(req, res)=>{
    res.json({
        LoggedIn : true,
        user: req.user
    })
});

userRoutes.post('/order/create', authCheck, createOrder)
userRoutes.get('/orders', authCheck, getAllOrders);
userRoutes.get('/myorders', authCheck, myOrders);
userRoutes.patch('/:orderId/status', authCheck, updateOrderStatus);