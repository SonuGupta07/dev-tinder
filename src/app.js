import express from 'express';
const app = express();
import {connectDB} from "./config/database.js"
import {User} from "./models/user.js"
import { validateSignUpData } from './utils/validation.js';
import bcrypt from "bcrypt"
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken';


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
     const isPasswordValid = await bcrypt.compare(password,user.password);
     if(isPasswordValid){
        const token = await jwt.sign({_id:user._id},"Dev@Tinder$790")
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
app.get("/profile",async(req,res)=>{
    try{
        const cookies = req.cookies;
      
        const {token} =   cookies;
        if(!token){
            throw new Error("Invalid Token");
        }
        const decodeMessage= jwt.verify(token,"Dev@Tinder$790");
        const {_id}=decodeMessage;
        const user = await User.findById(_id)
        console.log("logged In user is: "+_id);
        if(!user){
            throw new Error("user does not Exist")
        }
       res.send(user)

    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }
})
app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId;
 
    try{
    const user =  await  User.findOne({emailId:userEmail})
    if(user.length==0){
        res.status(404).send("User not found")
    }
    else{
    res.send(user);
    }
    }
    catch(err){
        res.status(400).send("something went wrong")
    }

})
//feed api get/feed - get all the users from the database
app.get("/feed", async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);

    }
    catch (err){
        res.status(400).send("something went wrong")

    }

})
//delete the user form the database 
app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        console.log(user)
        res.send("the user is get deleted ")
 
    }
    catch(err){
        res.status(400).send("something went wrong")
    }
})
app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params.userId;
    const data  = req.body;
 
    
    try{
        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed){
           throw new Error("Update not allowed")
        }
        if(data?.skills.length>10){
            throw new Error("skills cannot be greater than 10")
        }
        //it ignore all field like userId and only update such field which matches with your schema
        //by default it return the before docuemnt
        const user = await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"before", runValidators:true, })
        res.send("the user get updated")
      

    }catch(err){
        res.status(400).send("something went wrong " + err.message)
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
