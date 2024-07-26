const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Jenil@2911",
    database: "tsp"
});

const insertOrder = async (email,name,DayTime,daydate,qty) => {
    
    const timeToSeconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };
    try{
        
        const [result] = await pool.query(`SELECT User_ID FROM U_Contact WHERE type='email' && Information=\"${email}\"`);
        if(result.length === 0){
            throw new Error("user does not exists");
        }
        const UserID = result[0].User_ID;
        
        const [ans] = await pool.query(`SELECT Provider_ID from Provider_table where Name=\"${name}\"`);
        
        if(ans.length === 0){
            throw new Error("Provider does not exists");
        }
        const ProviderID = ans[0].Provider_ID;
        
        const [menuReturn] = await pool.query(`Select Menu_ID from menu where Provider_ID=? AND DayTime=? AND daydate=?`,[ProviderID,DayTime,daydate]);
        if(menuReturn.length === 0){
            throw new Error("Menu does not exists");
        }
        const menuID = menuReturn[0].Menu_ID;

        const [retTime] = await pool.query("Select Acceptance_Time from menu where Menu_ID=?",[menuID]);
        const accTime = retTime[0].Acceptance_Time;
        //const accTime='20:00:00';

        const currtimestamp=Date.now();
        const currDate = new Date(currtimestamp);
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const realTime = `${hours}:${minutes}:${seconds}`;

        const curr=timeToSeconds(realTime);
        const checkTime=timeToSeconds(accTime);

        if(curr<=checkTime){
        const [final] = await pool.query(`INSERT INTO Order_table SET ?`,{User_ID:UserID,Provider_ID:ProviderID,Menu_ID:menuID,Qty:qty,Date:currDate,Status:"D"});
        return final;
        }
        else{
            console.log("Time is exceeded");
            return 0;
        }
    }catch(err){
        console.log("Error in db",err);
        return 0;
    }
};

module.exports={insertOrder};