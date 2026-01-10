import express, { Router } from 'express'
import cors from 'cors'
import { ConnectDb } from './DB/ConnectDB.js';
import { configDotenv } from 'dotenv';
import { Login, SignUp } from './ServerControllers/userControllers.js';

configDotenv()
const myApp = express();
myApp.use(express.json());
myApp.use(cors({
    frontURL : process.env.FRONTEND_urL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    credentials: true
}));

ConnectDb();

let userRoute = Router()
userRoute.post('/register', SignUp)
userRoute.post('/login', Login)

myApp.use("/user", userRoute);

myApp.listen(3400, ()=>{
    console.log(
        "Its running!"
    );
    
})
