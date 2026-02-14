import Router from 'express'
import authCheck from '../MiddleCheck/protectedAcces.js';
import { allAdminOrders } from '../ServerControllers/AdminBoard.js';
export const adminRoutes = Router();

adminRoutes.get('/orders', authCheck, allAdminOrders)