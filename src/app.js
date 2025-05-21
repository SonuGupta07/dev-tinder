import express from 'express';
const app = express();
import {connectDB} from "./config/database.js"
import {User} from "./models/user.js"
import { validateSignUpData } from './utils/validation.js';
import bcrypt from "bcrypt"
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken';
import { userAuth } from './middlewares/auth.js';


app.use(express.json())//it is middleware which convert all the data in coming in json to javascript object
app.use(cookieParser());


app.post("/signup",async(req,res)=>{
    //validate of data


    //Encrypt the password
  
    
    try{
        validateSignUpData(req);
        const {password,firstName,lastName,emailId} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash)
        const user= new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash
        })
        
   await  user.save();//return a promise 
 res.send("user added succesfully ")
    }
    catch(err){
        res.status(400).send("error during the saving user "+err.message)
    }

})
app.post("/login",async(req,res)=>{
    try{
     const {emailId, password}= req.body;
    
     const user = await User.findOne({emailId:emailId})
     if(!user){
        throw new Error("EmailID id not present in DB")
     }
     const isPasswordValid = user.validatePassword(password)
     if(isPasswordValid){
        const token = await user.getJWT();
        console.log(token);
        res.cookie("token",token)
        res.send("login Successfully")
     }
     else{
        throw new Error("password  not correct")
     }
    }
    catch(err){
        res.status(400).send("Error: "+err.message);
    }
})
//find user by email 
app.get("/profile",userAuth,async(req,res)=>{
    try{
      
        const user =req.user;
       
       res.send(user)

    }
    catch(err){
        res.status(400).send("Error: "+err.message)
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
