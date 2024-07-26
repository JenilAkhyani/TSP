const {insertArea,menuArea} = require('./area.db');
const {sendResponse} = require("../services/response");

const addArea = async (req,resp) => {
    const {email,Area}=req.body;
    try{
        const result = await insertArea(email,Area);
        if(result === 0){
            sendResponse(resp,0,404,"Provider not found",null);
        }else {
            sendResponse(resp,1,200,"Area added successfully",result);
        }
    }catch(err){
        sendResponse(resp,0,500,"Error",err);
    }
};

const linkArea = async (req,resp) => {
    const {Area,email, DayTime, daydate} = req.body;
    try{
        const result = await menuArea(Area,email,DayTime,daydate);
        if(result === 0){
            sendResponse(resp,0,404,"Provider not found",null);
        }else {
            sendResponse(resp,1,200,"Area linked successfully",result);
        }
    }
    catch(err){
        sendResponse(resp,0,500,"Error",err);
    }

}

module.exports={addArea,linkArea};