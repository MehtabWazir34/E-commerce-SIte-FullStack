import { Router } from "express";
import { addProducts, getItemById, getProducts, 
    getProductsAndApplyFilter
 } from "../ServerControllers/productControllers.js";
import authCheck from "../MiddleCheck/protectedAcces.js";

export const productRoutes = Router();
productRoutes.post('/addnew', authCheck , addProducts)
productRoutes.get('/', getProducts)
productRoutes.get('/filtereditems', getProductsAndApplyFilter)
productRoutes.get('/:id', getItemById)