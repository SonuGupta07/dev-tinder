const express = require('express');
const app = express();
app.use("/hello/123",(req,res)=>{
    res.send("hello hello hello")
})
app.use("/",(req,res)=>{
    res.send("this is dashboard")
})
app.use("/test" ,(req,res)=>{
    res.send("hello from the server")

})
app.listen(3000,()=>{
    console.log("server is succesfully listening on port 3000")
});
//order of writing the route matter