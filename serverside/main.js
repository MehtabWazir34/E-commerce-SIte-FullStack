import express from 'express'
import cors from 'cors'
import { ConnectDb } from './DB/ConnectDB.js';
import { configDotenv } from 'dotenv';
import { userRoutes } from './Routes/userRoutes.js';
import { productRoutes } from './Routes/productRoutes.js';
import path from 'path'
// import { orderRoutes } from './Routes/orderRoutes.js';
configDotenv()
const myApp = express();
myApp.use(express.json());
myApp.use(cors({
    frontURL : process.env.FRONTEND_urL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    credentials: true
}));

ConnectDb();

myApp.use("/user", userRoutes);
myApp.use('/products', productRoutes);
// myApp.use('/order', orderRoutes);

myApp.use('/uploads', express.static(path.join(process.cwd(),"uploads")))
myApp.listen(3400, ()=>{
    console.log(
        `Its running! localhost:3400`
    );
    
})
