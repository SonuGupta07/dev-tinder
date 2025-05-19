const express = require('express');
const app = express();
const {adminAuth,userAuth} = require("./middlewares/auth.js")
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
// app.get("/user/:userid/:name", (req, res) => {
//     console.log(req.params);
//     res.send("getting query");
// });
// app.use("/user",(req,res,next)=>{
//     console.log("handling the route user1!"
//     )
//     next()
// },(req,res)=>{
//     console.log("handling the route user 2!!")
//     res.send("2nd response")

// })
//her 2nd response is responded
// app.use("/user",(req,res,next)=>{
//         console.log("handling the route user1!"
//         )
//         res.send("1st response")
//         next()
//     },(req,res)=>{
//         console.log("handling the route user 2!!")
//         res.send("2nd response")
    
//     })
    // it gives the 1st response but the 2nd responser is also get executed hence it give error in console because the connection is cut after the first respond
    // app.use("/user",(req,res,next)=>{
    //     console.log("handling the route user1!"
    //     )
    //     next()
    //     res.send("1st response")
      
    // },(req,res)=>{
    //     console.log("handling the route user 2!!")
    //     res.send("2nd response")
    
    // })
    // app.use("/user",(req,res,next)=>{
    //     console.log("handling the route user1!"
    //     )
        
       
       
    //    next();
    // },(req,res,next)=>{
    //     console.log("handling the route user 2!!")
    //     res.send("2nd response")
    
    // },(req,res,next)=>{
    //     console.log("handling the route user 2!!")
    //     res.send("3rd response")})
    // app.use("/user",(req,res,next)=>{
    //     console.log("handling the route user1!"
    //     )
        
       
       
    //    next();
    // },(req,res,next)=>{
    //     console.log("handling the route user 2!!")
       
    //     next();
    
    // },(req,res,next)=>{
    //     console.log("handling the route user 2!!")
    //   next();
    // })
    //here comes cannot Get/user expreess thinking that there must be some route handler but there is nothing hence it say there is no such route handling for /user
    // at the end the response should be send no matter how many requrest handler is there between them
//     app.use("/user",[(req,res,next)=>{
//         console.log("handling the route user1!"
//         )
        
       
       
//        next();
//     },(req,res,next)=>{
//         console.log("handling the route user 2!!")
       
//         next();
    
//     },(req,res,next)=>{
//         console.log("handling the route user 2!!")
//    res.send("response 3")
//     }])
    // wrap the function inside the array here 
    //you can add to some array aand some handler outside of array it also works
    // that is
    // app.use("/user",[rh, rh2],rh3,rh4) also Work
    // app.use("/user",rh,[rh1],rh3,rh4) also work 
    // app.use("/user",rh,rh2, rh3,hr4) also work all works
    //another way to handle multiple route
    // app.use("/user",(req,res,next)=>{
    //     console.log("handling the route user1!"
    //     )
        
       
       
    //    next();
    // });
    // app.use("/user",(req,res,next)=>{
    //     console.log("handling the rout user2")
    //     res.send("2nd route handler")
    // })
    // writing the middleware for all the admin route and for all type of all request

    // app.use("/admin",adminAuth)
    // app.get("/admin/getAllData",(req,res)=>{
    //     res.send("send all the data")
    // })
    // app.get("/admin/deleteUser",(req,res)=>{
    //     res.send("the user is deleted")
    // })
    // // various method you can add each of them
    // app.get("/user",userAuth,(req,res)=>{
    //     res.send("this is user")
    // })
    //two way of managing error 
    // 1st handle at last
    // app.get("/getUserData",(req,res)=>{
    //    throw("error occurs")
    // })
    // app.use("/",(err,req,res,next)=>{
    //     if(err){
    //         res.status(500).send("something went wrong")
    //     }
    // })
    // // 2nd way to handle the error
    // try and catch block
    app.get("/getUserData",(req,res)=>{
        try{
            throw Error("error occured")
            res.send("User data send")

        }catch(err){
            res.status(500).send("some error occured contact with our team")

        }
    })
    //proper way of error handling is try and catch
app.listen(3000, () => {
    console.log("server is successfully listening on port 3000");
});
// app.use handle all request to this handler like get post patch put all type of request 