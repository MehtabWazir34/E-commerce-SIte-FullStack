import express, { Router } from 'express'
import cors from 'cors'
import { ConnectDb } from './DB/ConnectDB.js';
import { configDotenv } from 'dotenv';
import { Login, SignUp } from './ServerControllers/userControllers.js';
import { userRoutes } from './Routes/userRoutes.js';
import { addProducts, getItemById } from './ServerControllers/productControllers.js';

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

myApp.use("/user", userRoutes);
myApp.use('/item', itemRoute)

myApp.listen(3400, ()=>{
    console.log(
        "Its running!"
    );
    
})
