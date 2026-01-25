import { Router } from "express";
import { addProducts, getItemById, getProducts, 
    getProductsAndApplyFilter
 } from "../ServerControllers/productControllers.js";
import authCheck from "../MiddleCheck/protectedAcces.js";
import { upload } from "../MiddleCheck/ImgMulter.js";

export const productRoutes = Router();
productRoutes.post('/addnew', authCheck, upload.single('Imgs', 6) , addProducts)
productRoutes.get('/', getProducts)
productRoutes.get('/filtereditems', getProductsAndApplyFilter)
productRoutes.get('/:id', getItemById)