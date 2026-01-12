import theProduct from "../DBModels/ProductModel.js";

export const addProducts = async(req, res)=>{
    try {
        let myProductsData = req.body;
        if(!Array.isArray(myProductsData)){
            res.status(400).json({Msg:"Invalid entery! Send an array of products."})
        };
        
        const myAllProducts = [];
        for(let newItem of myProductsData){
            const {Title, Detail, Name, Imgs, Size, Category, Price} = newItem;
            const newProduct = new theProduct({
                Title, Detail, Imgs, Name,
                Size, Price, Category
            });

            // const newAddedItem = await newProduct.save();
            myAllProducts.push(await newProduct.save());
        }
        return res.status(200).json({
            succes: true,
            Msg:"New product added ✅",
            myAllProducts
        })
    } catch (error) {
        console.log("Error to add product!", error);
        res.status(404).json({
            succes: false,
            Msg:"Faild to add prodcut"
        })
        
    }
}

export const getItemById = async(req, res)=>{
    try {
        // let {itemId} = req.params;
        let product = await theProduct.findById(req.params.id);
        if(!product){
            res.status(404).json({Msg:"Not found item"});
        };

        res.status(200).json({
            succes: true,
            product
        })
        
    } catch (error) {
        
        console.log("Error to get product!", error);
        res.status(404).json({
            succes: false,
            Msg:"Faild to get prodcut"
             })
    }
}