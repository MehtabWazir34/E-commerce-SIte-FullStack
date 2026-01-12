import express, { Router } from 'express'
import cors from 'cors'
import { ConnectDb } from './DB/ConnectDB.js';
import { configDotenv } from 'dotenv';
import { userRoutes } from './Routes/userRoutes.js';
import { addProducts, getItemById, getProductsAndApplyFilter } from './ServerControllers/productControllers.js';

configDotenv()
const myApp = express();
myApp.use(express.json());
myApp.use(cors({
    frontURL : process.env.FRONTEND_urL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    credentials: true
}));

ConnectDb();
let itemRoute = Router();
itemRoute.post('/additem', addProducts);
itemRoute.get('/:id', getItemById);
itemRoute.get('/', getProductsAndApplyFilter);

myApp.use("/user", userRoutes);
myApp.use('/item', itemRoute)

myApp.listen(3400, ()=>{
    console.log(
        "Its running!"
    );
    
})
