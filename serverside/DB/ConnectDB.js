import mongoose from "mongoose";

export const ConnectDb = async()=>{
    try {
            mongoose.connect('mongodb://localhost:27017/');
            console.log("MongooseDB Connected✅ ");
            
    } catch (error) {
        console.log('DB Connection error❌', error);
        
    }
}