const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Jenil@2911",
    database: "tsp"
});

const insertMenu = async (menu,area) => {
    
    const [result] = await pool.query("INSERT INTO menu SET ?", menu);
    const returnResponse = [];
    returnResponse.push(result);
    for(let i=0;i<area.length;i++){
        const [ans] = await pool.query("select Area_ID from area where provider_id=? and area=?",[menu.Provider_ID,area[i]]);
        let areaID;
        if(ans.length===0){
            const [res] = await pool.query("INSERT INTO area SET ?", {provider_id:menu.Provider_ID,area:area[i]});
            returnResponse.push(res);
            areaID=res.insertId;
        }
        else{
            returnResponse.push(ans);
            areaID=ans[0].Area_ID;
        }
        try{
        const [final] = await pool.query("insert into area_menu set ?",{area_id:areaID,menu_id:result.insertId});
        returnResponse.push(final);
        }catch(err){
            console.log(err);
        }
    }
    return returnResponse;
}

const displayMenu = async (email) => { 
    const [result] = await pool.query(`SELECT Provider_ID FROM P_Contact WHERE type='email' && Information=\"${email}\"`);
    if(result.length>0){
        const providerID = result[0].Provider_ID;
        const [ans] = await pool.query(`SELECT DayTime,daydate,Description,Price from menu where Provider_ID=${providerID}`);
        return ans;
    }
    else{
        console.log("Please enter valid email address");
        return 0;
    }
}

const updateMenu = async (id,data) => {
    const [result] = await pool.query(`SELECT Provider_ID FROM P_Contact WHERE type='email' && Information=\"${email}\"`);
    const providerID = result[0].Provider_ID;

    let query='UPDATE menu SET ';
    let queryparams=[];
    Object.keys(data).forEach((key,index)=>{
        console.log(key,data[key]);
        if(data[key] !== null && data[key] !== undefined){
        query+=`${key}=?`;
        queryparams.push(data[key]);
        if(index<Object.keys(data).length-1){
            query+=', ';
        }}
    });
    query += ' WHERE Provider_ID = ? AND DayTime = ? AND daydate = ?;';
        queryparams.push(providerID, id.DayTime, id.daydate);
        console.log(query);
        console.log(queryparams);

        const [ans]=await pool.query(query, queryparams, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
        return ans;
}

const displayUserMenu = async (searchKey)=>{
    const [res] = await pool.query(`SELECT DayTime,Acceptance_Time,Description,Price from menu where Description LIKE '%${searchKey}%'`);
    if(res.length!==0) return res;
    const [ans2] = await pool.query(`SELECT Provider_ID from Provider_table WHERE Name LIKE '%${searchKey}%'`);
    if(ans2.length>0){
        const providerID = ans2[0].Provider_ID;
        const [ans] = await pool.query(`SELECT DayTime,Acceptance_Time,Description,Price from menu where Provider_ID=${providerID}`);
        return ans;
    }
    else{
        console.log("Please enter valid searchKey");
        return ans2;
    }
}

module.exports={insertMenu, displayMenu, updateMenu,displayUserMenu};