import Router from 'express'
import authCheck from '../MiddleCheck/protectedAcces.js';
import { allAdminOrders, getOrder } from '../ServerControllers/AdminBoard.js';
import { deleteProduct, updateProduct } from '../ServerControllers/productControllers.js';
import { uploadStorage } from '../MiddleCheck/ImgMulter.js';
export const adminRoutes = Router();


adminRoutes.get('/orders', authCheck, allAdminOrders)
adminRoutes.get('/order/info/:id', authCheck, getOrder)
adminRoutes.delete('/delpro/:id', authCheck, deleteProduct)
adminRoutes.put('/editpro/:id', authCheck, uploadStorage.array("Imgs", 6), updateProduct);