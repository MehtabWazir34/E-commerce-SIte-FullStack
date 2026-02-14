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
