import jwt from "jsonwebtoken"
import { User } from "../models/user.js";
export const userAuth = async(req,res,next)=>{
   //read the token from the request cookies validate the user and find the user
   try{
   const {token} = req.cookies;
   if(!token){
    throw new Error("Token is not valid !!!!!")
   }
   console.log('sonu')
   console.log(token)
   const decodeObj = await jwt.verify(token, "Dev@Tinder$790");

   console.log(decodeObj)
   let { _id } = decodeObj;

   const user= await User.findById(_id);
   if(!user){
    throw new Error("User not found")
   }
   req.user= user;
   next();
}
catch(err){
    res.status(400).send("Error " + err.message)
}

}
