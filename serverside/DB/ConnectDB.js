import mongoose from "mongoose";

export const ConnectDb = async()=>{
    try {
            mongoose.connect(process.env.mongoDB_URL);
            console.log("MongooseDB Connected✅ ");
            
    } catch (error) {
        console.log('DB Connection error❌', error);
        
    }
}