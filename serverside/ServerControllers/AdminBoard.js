import theOrder from '../DBModels/OrderModel.js'
export const allAdminOrders = async (req, res)=>{
    try {
        const allOrders = await theOrder.find();
        if(!allOrders){
            res.json({Msg:"Error to get orders"})
        }
        res.json({
            success: true,
            Msg: "Orders fetched",
            allOrders
        })
    } catch (error) {
        res.json({
            Msg: "Error", error
        })
    }  
}

export const getOrder = async(req, res)=>{
    console.log(req.params.id);
    try {
        
        // const {id} = req.params.id
        let tOrder = await theOrder.findById(req.params.id);
        if(!tOrder){
            return res.json({
                Msg:"Order not found!"
            })
        };
        return res.json({
            success: true,
            tOrder
        })
    } catch (error) {
        console.log("Err: ", error);
        
        res.json({
            Msg: error.message
        })
    }
}