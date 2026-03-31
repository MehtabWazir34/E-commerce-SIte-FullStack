import { Router } from "express";
import { add2Cart, deleteCartItem, getCartItems, getMe, googleAuth, Login, Logout,  reviewOrder,  SignUp, updateUserRole } from "../ServerControllers/userControllers.js";
import authCheck from "../MiddleCheck/protectedAcces.js";
import { createOrder, deleteOrder, getAllOrders, myOrders, updateOrderStatus } from "../ServerControllers/OrderCtrls.js";

export const userRoutes = Router();
userRoutes.get('/', (req, res)=>{
    res.json({
        Msg:"User route is working"
    })
})

userRoutes.post('/register', SignUp);
userRoutes.post('/login', Login);
userRoutes.post('/google-auth', googleAuth)
userRoutes.get('/me', authCheck, getMe )
userRoutes.post('/logout', authCheck ,Logout);
userRoutes.post('/addtocart', authCheck,  add2Cart);
userRoutes.get('/mycart', authCheck,  getCartItems);
userRoutes.delete('/deletecartitem/:itemId', authCheck, deleteCartItem);
userRoutes.delete('/deleteorder/:id', authCheck, deleteOrder)
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
userRoutes.patch('/:userId/role', authCheck, updateUserRole)
userRoutes.post('/addreview/:id', authCheck, reviewOrder )