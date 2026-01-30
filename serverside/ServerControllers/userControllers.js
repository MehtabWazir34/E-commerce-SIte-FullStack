// import bcrypt from 'bcrypt'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
// import { the } from "../DBModels/UserModel.js";
import theUser from '../DBModels/UserModel.js';
import theCart from "../DBModels/Add2Cart.js";
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
export const Logout = async(req, res)=>{
    try {
        await theUser.findByIdAndUpdate(
            req.user.id,
            // {refreshToken: null} 
        );

        res.status(200).json({msg:"Logged out✅", success: true})
    } catch (error) {
        console.log({Msg:'Error, Logout failed❌', error, success:false,}),
        res.status(500).json({msg:"Loging out faild❌", success: false })
        
    }
}

export const addToCart =async(req, res)=>{
    try {
        const {itemId, itemQty} = req.body;
        let user = await theUser.findById(req.user.id);
        if(!user){
            res.status(404).json({Msg: "User not found to add item"});
        }
        let theItemIdx = user.cartList.findIndex((itm)=> itm.product.equals(itemId));
        if(theItemIdx !== -1){
            user.cartList[theItemIdx].itemQty += itemQty;
        } else {
            user.cartList[theItemIdx].itemQty = itemQty;
        };
        await user.save();
        res.status(200).json({
            success: true, 
            Msg: "Item added to cart ✅",
            theItemIdx
        })
        
    } catch (error) {
        console.log("error failed to add item", error);
        res.status(401).json({
            success: false,
            
        })
        
    }
}

export const removeFromCart = async(req, res)=>{
    try {
        const {itemId, itemQty} = req.body;
        let user = await theUser.findById(req.user.id);
        if(!user){
            res.status(404).json({Msg:"User not found to remove itm"});
        }
        const theItemIdx = user.cartList.findIndex((itm)=> itm.product.equals(itemId));
        if(theItemIdx !==-1){
            if(itemQty && itemQty){
                user.cartList[theItemIdx].itemQty -=itemQty;
            }
            if(user.cartList[theItemIdx].itemQty <=0){
                user.cartList.splice(theItemIdx, 1)
            }
            
        } else{
            user.cartList.splice(theItemIdx, 1);
        }
        await user.save();
        res.status(200).json({
            success: true,
            Msg: "Item removed from cart ✅",
            theItemIdx
        })
    } catch (error) {
        console.log("error failed to add item", error);
        res.status(401).json({
            success: false,
    })
    }
}

export const add2Cart = async(req, res)=>{
    let userId = req.user.id;
    let itemId = req.body.itemId;
    try {
        const cartItems = await theCart.findOne({userId, itemId});
        if(!cartItems){
            const addNewItem = await theCart.create({
                userId,
                itemId,
                "itemQty": 1,
                // "itemImg": req.body.Imgs, 
            });

            // let addedToCart = await addNewItem.save();
            res.json({
                success : true,
                msg:"new item added",
                cartItems: addNewItem
            })

        } 
        cartItems.itemQty +=1;
        await cartItems.save();
        res.json({
            success: true,
            Msg:"Item already exsts! ItemQty updated",
            cartItems
        })
        // else {
        //     // const item_Id = cartItems[0]._id;
        //     const itemQty = cartItems.itemQty + 1;
        //     const data = {itemQty}
        //     const updatedCartItems = await theCart.findByIdAndUpdate(
        //         data, 
        //     {new : true})
        //     res.json({
        //         success : true,
        //         Msg: "Item added to the cart!",
        //         updatedCartItems
        //     });
        //     res.json({success: true, msg:"item already in cart", cartItems
        //     })
        // }
    } catch (error) {
        console.log("Error to add item:", error);
        
        return res.json("Error to add item", error)
    }

}

export const getCartItems = async(req, res)=>{
    try {
        // let userId = req.user.id;
        if(!req.user || !req.user.id){
            return res.json({
                Msg:"Can't find user",
            
            })
        } 
        let theItems = await theCart.find({userId: req.user.id}).populate('itemId')
        // let items = Array.isArray(theItems)
            return res.json({
                success: true,
                Items: theItems.length,
                theItems
            });
        
    } catch (error) {
        console.log("Error to get cartItems", error);
        
    }
}