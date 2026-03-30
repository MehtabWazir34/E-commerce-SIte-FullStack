import express from 'express'
import cors from 'cors'
import { ConnectDb } from '../serverside/DB/ConnectDB.js';
import { configDotenv } from 'dotenv';
import { userRoutes } from '../serverside/Routes/userRoutes.js';
import { productRoutes } from '../serverside/Routes/productRoutes.js';
import path from 'path'
import { adminRoutes } from '../serverside/Routes/AdminRoutes.js';
// import { orderRoutes } from '../Routes/orderRoutes.js';
configDotenv()
const myApp = express();
myApp.use(express.json());
myApp.use(cors({
    origin : process.env.FRONTEND_urL || 'http://localhost:5173/',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    credentials: true
}));

ConnectDb()

myApp.use("/user", userRoutes);
myApp.use('/products', productRoutes);
myApp.use('/admin', adminRoutes);

myApp.use('/uploads', express.static(path.join(process.cwd(),"uploads")))

if(process.env.NODE_ENV !== 'production'){
    myApp.listen(3400, ()=>{
    console.log(
        `Its running in development mode! localhost:3400`
    );
    })
}
export default myApp