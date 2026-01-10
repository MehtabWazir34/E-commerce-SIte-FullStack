import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import { the } from "../DBModels/UserModel.js";
import theUser from '../DBModels/UserModel.js';

export const SignUp = async(req, res)=>{
    try {
    const {fullName, userName, email, phoneNo, password} = req.body;
    if(!fullName || !userName || !email || !phoneNo || !password){
        return res.status(404).json({Msg:"All fields are required to fill."})
    };

    // check existence
    let lowerUserName = userName.toLowerCase();
    let accountExsts = await theUser.findOne({userName: lowerUserName});
    if(accountExsts){
        return res.status(401).json({Msg:"Account already exist, Plz login."})
    }
    let convertedPassword = await bcrypt.hash(password, 10);
    const user = theUser.create({
        fullName, email, phoneNo,
        userName: lowerUserName, password: convertedPassword
    })
    let token = jwt.sign({id:user._id}, process.env.MY_APP_JWT_SECRET_KEY,{
        expiresIn: "7d"
    });
    user.password = undefined

    res.status(200).json({
        Msg:"Account created ✅",
        success: true,
        token, user
    })
        
    } catch (error) {
        console.log("Opps! failed to create account ❌");
        return res.status(500).json({Msg: `Error found! ${error.message}` })
        
    }
}
export const Login = async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(401).json(({Msg:"Plz fill both the fields."}))
    };
    let user = await theUser.findOne({email});
    if(!user){
        return res.status(404).json({Msg:"user not exists, Plz signup "});
    }
    let matchPassword = await bcrypt.compare(password, user.password);
    if(!matchPassword){
        return res.status(401).json({Msg:"Incorrect password ❌, try again"});
    }

    const token = jwt.sign({id:user._id}, process.env.MY_APP_JWT_SECRET_KEY,{expiresIn:"7d"});
    user.password = undefined;

    res.status(200).json({
        Msg:"Logged in ✅",
        success: true,
        token, user

    })

}