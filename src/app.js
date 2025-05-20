import express from 'express';
const app = express();
import {connectDB} from "./config/database.js"
import {User} from "./models/user.js"
app.use(express.json())//it is middleware which convert all the data in coming in json to javascript object

app.post("/signup",async(req,res)=>{
  
    console.log(req.body)
    const userObj=req.body;
    //creating a new instance of the user model 
    const user = new User(userObj)
    try{
   await  user.save();//return a promise 
 res.send("user added succesfully ")
    }
    catch(err){
        res.status(400).send("error during the saving user "+err.message)
    }

})
//find user by email 
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
app.patch("/user",async(req,res)=>{
    const userId = req.body.userId;
    const data  = req.body;
    
    try{
        //it ignore all field like userId and only update such field which matches with your schema
        //by default it return the before docuemnt
        const user = await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"before", runValidators:true, })
        res.send("the user get updated")
      

    }catch(err){
        res.status(400).send("something went wrong" + err.message)
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
