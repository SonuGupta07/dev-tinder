import express from 'express';
const app = express();
import {connectDB} from "./config/database.js"
import {User} from "./models/user.js"

app.post("/signup",async(req,res)=>{
    const userObj={
        firstName:"monu",
        lastName:"gupta",
        emailId:"monugupta27032001@gmail.com",
        password:"monu@123"
    }
    //creating a new instance of the user model 
    const user = new User(userObj)
    try{
   await  user.save();//return a promise 
 res.send("user added succesfully ")
    }
    catch(err){
        res.status(400).send("error during the saving user + err.message")
    }

})
connectDB().then(()=>{
    console.log("database is connected")
        
}).catch(err=>{
     console.error("Database is not Connected")
})
//first of all connected to the database then do the app.listen or start listening 
app.listen(3000, () => {
    console.log("server is successfully listening on port 3000");
});
