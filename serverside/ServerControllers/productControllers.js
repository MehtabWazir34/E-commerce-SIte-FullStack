import theProduct from "../DBModels/ProductModel.js";

export const addProducts = async(req, res)=>{
    try {
        const productsData = req.body
        if(!Array.isArray(productsData)){
            res.status(500).json({Msg:"Needs an array of products"})
        };
        const addedProducts = [];
        for(const eachProductDetails of productsData){
            const {productTitle, productDetail, productName, productPrice, productImgs, productSize, productCategory} = eachProductDetails;
            const product = new theProduct({
                productTitle, 
                productDetail,
                productName, 
                productPrice,
                productImgs, 
                productSize,
                productCategory
            });
            let newProduct = await product.save();
            addedProducts.push(newProduct);
        };
        return res.status(200).json({
            succes: true,
            Msg:"New product added ✅",
            addedProducts
        })
    } catch (error) {
        console.log("Error to add product!", error);
        res.status(404).json({
            succes: false,
            Msg:"Faild to add prodcut"
        })
        
    }
}