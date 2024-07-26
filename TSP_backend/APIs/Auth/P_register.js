
app.post("/signup",(req,resp)=>{
    const data = req.params.table;
    const query = `SELECT * FROM \`${data}\``;
    con.query(query,(err,result)=>{
        if(err) throw err;
        else resp.send(result);
    })
})