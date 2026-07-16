import cloudinary from "../cnfg/cloudii.js";
import theProduct from "../DBModels/ProductModel.js";

export const addProducts = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        Msg: "At least one image is required."
      });
    }

    //  Extract body itms
    const { Title, Detail, Category, Price, offPrice, deliveryFee } = req.body;

    //  upload to cloudinary
    let imgUrls = req.files;
    if(imgUrls){
        let thePrms = imgUrls.map((img)=> cloudinary.uploader.upload(img.path, {folder:'janSports/products'}))
        let res = await Promise.all(thePrms);
        imgUrls = res.map(file => file.secure_url)
    }

    // Create product
    const newProduct = await theProduct.create({
      Title,
      Detail,
      Category,
      Price, offPrice, deliveryFee,
      Imgs: imgUrls
    });

    // Respond
    return res.status(201).json({
      success: true,
      Msg: "New product added ✅",
      product: newProduct
    });

  } catch (error) {
    console.error("Error to add product!", error);

    return res.status(500).json({
      success: false,
      Msg: "Failed to add product"
    });
  }
};

export const getItemById = async(req, res)=>{
    try {
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
        res.json({
            succes: false,
            Msg:"Faild to get products",
            error: error.message
        })
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
            itemFilter.Category = {$in: Array.isArray(Category) ? Category : [Category]}
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
        
    } catch (error) {
        console.log("error❌", error);
        res.status(400).json({
            succes: true,
            Msg:"Error"
        })
        
    }
}
export const deleteProduct = async(req, res) =>{
    try {
        const delProd = await theProduct.findByIdAndDelete(req.params.id);
        if(!delProd){
            res.status(404).json({
                Msg:"Not found!"
            })
        };
        res.status(200).json({
            succes: true,
            Msg: "Product deleted ✅",
            delProd
        })
    } catch (error) {
        res.status(401).json({
            succes: false,
            Msg: error.message
        })
    }
}
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const {Title, Detail, offPrice, Price, deliveryFee, Category} = req.body;
        let Imgs = req.files;
        if (Imgs) {
            let imgFiles = Imgs.map((file) => cloudinary.uploader.upload(file.path, {folder:'janSports/products'}));
            let theResult = await Promise.all(imgFiles);
            Imgs = theResult.map((file)=> file.secure_url)
        }
        const updatedProduct = await theProduct.findByIdAndUpdate(
            productId,
            {Title, deliveryFee, Detail, offPrice, Price, Category, Imgs},
            { new: true }
        );

        res.status(200).json({
            success: true,
            updatedProduct
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};