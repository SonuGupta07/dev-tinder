import mongoose from "mongoose"
//this is how we connected to the cluster
//it return the promise
export const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://sonugupta:sonugupta07@namastenode.lvzwyq2.mongodb.net/devTinder")
    
}

