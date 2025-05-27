import express from  "express"

import { userAuth } from '../src/middlewares/auth.js';
import {validateEditProfileData} from "../src/utils/validation.js"
export const profileRouter = express.Router();

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
      
        const user =req.user;
       
       res.send(user)

    }
    catch(err){
        res.status(400).send("Error: "+err.message)
    }
})
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit reques");
            
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
        await loggedInUser.save();
        // res.send(`${loggedInUser.firstName}, your profile updated successfully`)
        res.send({data:loggedInUser});

    }
    catch(err){
        res.status(400).send("error: " + err.message)
    }

})