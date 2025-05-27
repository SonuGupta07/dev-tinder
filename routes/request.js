import express from "express";

import { userAuth } from '../src/middlewares/auth.js';
export const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user = req.user;
    console.log("Sending a connection request")
    res.send(user.firstName+"sent the connection request")

});