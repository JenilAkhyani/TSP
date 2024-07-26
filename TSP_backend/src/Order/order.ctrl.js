const {sendResponse} = require("../services/response");
const {insertOrder} = require('./order.db');

const placeOrder = async (req,resp) => {
    const {email,name,DayTime,daydate,qty}=req.body;
    console.log(req.body);
    try{
        console.log("1");
        const result = await insertOrder(email,name,DayTime,daydate,qty);
        if(result === 0){
            sendResponse(resp,0,404,"Order not placed",null);
        }else {
            sendResponse(resp,1,200,"Order placed successfully",result);
        }
    }catch(err){
        sendResponse(resp,0,500,"Error",err);
    }
};

module.exports={placeOrder};