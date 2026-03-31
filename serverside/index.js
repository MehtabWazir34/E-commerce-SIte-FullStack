import express from 'express'
import cors from 'cors'
import { ConnectDb } from './DB/ConnectDB.js'
import { configDotenv } from 'dotenv';
import { userRoutes } from './Routes/userRoutes.js';
import { productRoutes } from './Routes/productRoutes.js';
import path from 'path'
import { adminRoutes } from './Routes/AdminRoutes.js';
// import { orderRoutes } from './Routes/orderRoutes.js';
configDotenv()
const App = express();
App.use(express.json());
App.use(cors({
    origin : process.env.FRONTEND_urL || 'http://localhost:5173/',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    credentials: true
}));

ConnectDb()

App.use("/user", userRoutes);
App.use('/products', productRoutes);
App.use('/admin', adminRoutes);

App.use('/uploads', express.static(path.join(process.cwd(),"uploads")))

if(process.env.NODE_ENV === 'development'){
    App.listen(3400, ()=>{
    console.log(
        `Its running in development mode! localhost:3400`
    );
    })
}
export default App