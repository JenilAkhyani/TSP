const mysql=require('mysql');
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Jenil@2911",
    database:"tsp"
});
con.connect((err)=>{
    if(err){
        console.warn("error in connection");
    }
    else{
        console.log("connected");
    }
}
)
module.exports=con;