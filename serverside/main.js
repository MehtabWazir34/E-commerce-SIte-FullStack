import express from 'express'
import cors from 'cors'
import { ConnectDb } from './DB/ConnectDB.js';
const myApp = express();
myApp.use(express.json());
myApp.use(cors({
    frontURL : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    credentials: true
}));

ConnectDb();


myApp.listen(3400, ()=>{
    console.log(
        "Its running!"
    );
    
})
