import Router from 'express'
import authCheck from '../MiddleCheck/protectedAcces.js';
import { allAdminOrders, getOrder } from '../ServerControllers/AdminBoard.js';
export const adminRoutes = Router();

adminRoutes.get('/orders', authCheck, allAdminOrders)
adminRoutes.get('/order/info/:id', authCheck, getOrder)