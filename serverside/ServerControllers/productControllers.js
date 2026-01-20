import theProduct from "../DBModels/ProductModel.js";

export const addProducts = async(req, res)=>{
    try {
        let myProductsData = req.body;
        if(!Array.isArray(myProductsData)){
            res.status(400).json({Msg:"Invalid entery! Send an array of products."})
        };
        
        const myAllProducts = [];
        for(let newItem of myProductsData){
            const {Title, Detail, Name, Imgs, 
                // Size, 
                Category, Price} = newItem;
            const newProduct = new theProduct({
                Title, Detail, Imgs, Name,
                // Size,
                Price, Category
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
export const getProducts = async(req, res)=>{
    try {
        let products = await theProduct.find();
        
        res.status(200).json({
            Msg:"Date recieved",
            products
        })
    } catch (error) {
        console.log("Err", error);
        
    }
}

export const getProductsAndApplyFilter = async(req, res)=>{
    try {
        let {Category, 
            sizes,
             search, lowPrice, highPrice} = req.query;
        sizes = sizes ? sizes.split(',').filter(Boolean) : [];
        Category = Category ? Category.split(',').filter(Boolean) : [];
        const itemFilter = {};

        if(Category && Category.length > 0){
            itemFilter.Category = {$in: Array.isArray(Category) ? Category: [Category]}
        itemFilter.Category = { $in: Category.map(cat => new RegExp(`^${cat}$`, `i`))}
        }
        if(sizes.length > 0){
            itemFilter.Size = { $in : sizes}
        };
        if(lowPrice || highPrice){
            itemFilter['Price.originalPrice'] = {};
            if(lowPrice){
                itemFilter['Price.originalPrice'].$gte = Number(lowPrice)
            };
            if(highPrice){
                itemFilter['Price.originalPrice'].$lte = Number(highPrice)
            }
        }
        if(search){
            itemFilter.$or =[
                {Title : {$regex : search, $options : 'i'}},
                {Detail : { $regex : search, $options : 'i'}}
            ]
        };

        const filteredItems = await theProduct.find(itemFilter);
        res.status(200).json({
            succes: true,
            filteredItems
        })
        console.log("Category:", req.query.Category);
        console.log("Type:", typeof req.query.Category);

        
    } catch (error) {
        console.log("error❌", error);
        res.status(400).json({
            succes: true,
            Msg:"Error"
        })
        
    }
}