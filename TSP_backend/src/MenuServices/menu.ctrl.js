const {insertMenu,displayMenu,updateMenu,displayUserMenu} = require('./menu.db');
const {sendResponse} = require("../services/response");

const addMenu = async (req,resp) =>{
    const {Provider_ID,DayTime,Acceptance_Time,Price,Description,daydate,area}=req.body;
    try{
        const result =await insertMenu({Provider_ID,DayTime,Acceptance_Time,Price,Description,daydate},area);
        console.log(result.length);
        sendResponse(resp,1,200,"Menu succesfully added",result);
    }catch(err){
        sendResponse(resp,0,500,"Error",err);
    }

}

const getMenu = async (req,resp) => {
    const {email}=req.query;
    try{
        const result = await displayMenu(email);
        if(result === 0){
            sendResponse(resp,0,404,"Provider not found",null);
        }else {
            sendResponse(resp,1,200,"Menu fetched successfully",result);
        }
    }catch(err){
        sendResponse(resp,0,500,"Error",err);
    }
}

const editMenu = async (req,resp) =>{
    console.log("1");
    const {email,DayTime, daydate, Price, Description,Acceptance_Time} = req.body;
    try{
        console.log("2");
        const result = await updateMenu({email:email,DayTime:DayTime, daydate:daydate}, {Acceptance_Time:Acceptance_Time,Price:Price, Description:Description});
        console.log("3");
        if (result.affectedRows > 0) {
            sendResponse(resp, 1, 200, "Menu updated successfully", result);
        } else {
            sendResponse(resp, 0, 404, "Menu not found", null);
        }
    }catch(err){
        console.error('Error updating menu:', err);
        sendResponse(resp,0,500,"Error",err);
    }
}

const getUserMenu = async (req,resp) => {
    const {searchKey}=req.query;
    try{
        const result = await displayUserMenu(searchKey);
        if(result.length === 0){
            sendResponse(resp,0,404,"searchKey is not appropriate",null);
        }else {
            sendResponse(resp,1,200,"Menu fetched successfully",result);
        }
    }catch(err){
        sendResponse(resp,0,500,"Error",err);
    }
}

module.exports={addMenu,getMenu,editMenu,getUserMenu};