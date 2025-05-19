const express = require('express');
const app = express();

// Route 1
app.get("/user", (req, res) => {
    res.send({firstname:"sonu",seondName:"gupta"});
});
app.post("/user",(req,res)=>{
    //db is saving
    res.send("data is saved successfully")
})
app.delete('/user',(req,res)=>{
    res.send("the user get deleted")
})

// Route 3
app.use("/test", (req, res) => {
    res.send("hello from the server");
});

app.listen(3000, () => {
    console.log("server is successfully listening on port 3000");
});
