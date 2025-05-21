import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
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
//you can add method to the schema which is only relate to the user
//we do this becasue this functonallity very much attach with the user 
userSchema.methods.getJWT= async function(){
    const user = this;
    const token= await jwt.sign({_id:user._id},"Dev@Tinder$790",{expiresIn:"7d"});
    return token;
}
userSchema.methods.validatePassword= async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid= await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    )
    return isPasswordValid
}
export const User = mongoose.model("User",userSchema);


