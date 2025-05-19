const express = require('express');
const app = express();
// app.get(/^\/ab?c$/, (req, res) => {
//     res.send("this is me");
//   });
  
//here b is optional that is match abc and ac
// app.get(/^\/ab+c$/, (req, res) => {
//     res.send("any number of b works except zero");
//   });
  
// app.get(/^\/ab.*cd$/,(req,res)=>{
//     res.send("anything in between ab and cd you write it get matched")
// })
// app.get(/^\/(ab)?c$/, (req, res) => {
//     res.send("here ab is optional");
//   });
// app.get(/a/,(req,res)=>{
//     res.send("any of the path contain a it will works it is regex")
// })
// app.get(/.*fly$/,(req,res)=>{
//     res.send("it will handle all the route which end on fly")
// })
// app.get("/user",(req,res)=>{
//     console.log(req.query)
  
//     res.send("how can we get the params of the url or say how we read the query parameters")

// })
app.get("/user/:userid/:name", (req, res) => {
    console.log(req.params);
    res.send("getting query");
});

app.listen(3000, () => {
    console.log("server is successfully listening on port 3000");
});
