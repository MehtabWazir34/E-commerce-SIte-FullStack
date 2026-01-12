import { Router } from "express";
import { addProducts, getItemById, getProductsAndApplyFilter } from "../ServerControllers/productControllers";
import authCheck from "../MiddleCheck/protectedAcces";

export const productRoutes = Router();
productRoutes.post('/addnew', authCheck, addProducts)
productRoutes.get('/', authCheck, getProductsAndApplyFilter)
productRoutes.get('/:id', getItemById)