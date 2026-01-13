import { Router } from "express";
import { addProducts, getItemById, getProductsAndApplyFilter } from "../ServerControllers/productControllers.js";
import authCheck from "../MiddleCheck/protectedAcces.js";

export const productRoutes = Router();
productRoutes.post('/addnew', authCheck, addProducts)
productRoutes.get('/', authCheck, getProductsAndApplyFilter)
productRoutes.get('/:id', getItemById)