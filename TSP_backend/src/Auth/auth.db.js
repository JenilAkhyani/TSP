const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Jenil@2911",
    database: "tsp"
});

const insertProvider = async (provider) => {
    const [result] = await pool.query("INSERT INTO provider_table SET ?", provider);
    return result;
};

const insertContact = async (contact) => {
    const [result] = await pool.query("INSERT INTO p_contact SET ?", contact);
    return result;
};

const checkProvider = async (email) => {
    const [result] = await pool.query(`SELECT Provider_ID FROM P_Contact WHERE type='email' && Information=\"${email}\"`)
    if(result.length>0){
        const providerID = result[0].Provider_ID;
        const [ans] = await pool.query(`SELECT Pass from Provider_table where Provider_ID=${providerID}`);
        return ans;
    }
    else{
        console.log("Please enter valid email address");
        return 0;
    }
};

const insertUser = async (User) =>{
    const [result] = await pool.query("INSERT INTO Users SET ?", User);
    return result;
} ;

const insertUserContact = async (Contact) =>{
    const [result] = await pool.query("INSERT INTO U_Contact SET ?", Contact);
    return result;
};

const checkUser = async (email) => {
    const [result] = await pool.query(`SELECT User_ID FROM U_Contact WHERE type='email' && Information=\"${email}\"`);
    console.log(result);
    if(result.length>0){
        const userID = result[0].User_ID;
        const [ans] = await pool.query(`SELECT Pass from users where User_ID=${userID}`);
        return ans;
    }
    else{
        console.log("Please enter valid email address");
        return 0;
    }
};

module.exports = { insertProvider, insertContact ,checkProvider, insertUser, insertUserContact, checkUser };
