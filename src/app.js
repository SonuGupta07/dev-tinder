import express from 'express';
const app = express();
import {connectDB} from "./config/database.js"

import cookieParser from 'cookie-parser'


app.use(express.json())//it is middleware which convert all the data in coming in json to javascript object
app.use(cookieParser());
import {authRouter} from "../routes/auth.js"
import { profileRouter } from '../routes/profile.js';
import { requestRouter } from '../routes/request.js';

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);



//find user by email 




connectDB().then(()=>{
    console.log("database is connected")
        
}).catch(err=>{
     console.error("Database is not Connected")
})
//first of all connected to the database then do the app.listen or start listening 
app.listen(3000, () => {
    console.log("server is successfully listening on port 3000");
});
