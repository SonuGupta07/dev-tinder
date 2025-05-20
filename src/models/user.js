import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: "+ value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword (value)){
                throw new Error("Enter a strong password: "+ value)
            }
        }
    },
    age:{
        type:Number,
        min:18,
        
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbgJDFLehkQpFnas_gqV8aGpJTzR26MIlsatrb458vJWIFM9KZpv0HXnSRsbHJ6VjLx4I&usqp=CAU",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URl "+ value)
            }
        }
    },
    about:{
        type:String,
        default:"This is default about"
    },
   skills:{
    type:[String]
   }
},{
    timestamps:true,
});
export const User = mongoose.model("User",userSchema);


