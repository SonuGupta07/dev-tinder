import express from "express"

import {User} from "../src/models/user.js"
import { validateSignUpData } from '../src/utils/validation.js';
import bcrypt from "bcrypt"
export const authRouter = express.Router();


authRouter.post("/signup",async(req,res)=>{
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
authRouter.post("/login",async(req,res)=>{
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
authRouter.post("/logout",(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    })
    res.send("Logout Successfull");
})