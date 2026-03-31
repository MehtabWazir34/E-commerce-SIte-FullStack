import mongoose from "mongoose";

export const ConnectDb = async()=>{
    try {
          await mongoose.connect(
                // process.env.NODE_ENV === "production" ?
                process.env.mongoDB_URL 
                ||
                "mongodb://localhost:27017/"
            );
            console.log("MongooseDB Connected✅ ");
            
    } catch (error) {
        console.log('DB Connection error❌', error);
        
    }
}