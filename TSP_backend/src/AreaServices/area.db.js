const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Jenil@2911",
    database: "tsp"
});

const insertArea = async (email,area) => {
    const [result] = await pool.query(`SELECT Provider_ID FROM P_Contact WHERE type='email' && Information=\"${email}\"`);
    if(result.length>0){
        const providerID = result[0].Provider_ID;
        const [ans] = await pool.query(`INSERT INTO Area SET ?`,{Provider_ID:providerID,Area:area});
        return ans;
    }
    else{
        console.log("Please enter valid email address");
        return 0;
    }
};

const menuArea = async (Area,email, DayTime, daydate) =>{
    const [result] = await pool.query(`SELECT Provider_ID FROM P_Contact WHERE type='email' && Information=\"${email}\"`);
    if(result.length>0){
        const providerID = result[0].Provider_ID;
        const [ans] = await pool.query(`select Area_ID from area where Provider_ID=${providerID} AND Area=\"${Area}\"`);
        const areaID=ans[0].Area_ID;
        
        const [ans2]= await pool.query(`select Menu_ID from menu where Provider_ID=? AND DayTime=? AND daydate=?`,[providerID, DayTime, daydate]);
        const menuId=ans2[0].Menu_ID;
        
        const [final] =await pool.query('insert into area_menu set ?',{Area_ID:areaID,Menu_ID:menuId});
        return final;
    }
    else{
        console.log("Please enter valid email address");
        return 0;
    }
};

module.exports={insertArea,menuArea};