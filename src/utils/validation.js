import validator  from "validator"
export const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId, password}  = req.body;
    if(!firstName|| !lastName){
        throw new Error("Name is not valid")

    }
    else if(firstName.length<4 || firstName.length>50){
        throw new Error("FirstName should be 4-50 characters")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("please enter a strong password!")
    }
   
    
}
export const validateEditProfileData =(req)=>{
    const allowedEditFields=[
        "firstName",
        "LastName", 
        "emailId",
        "gender",
        "age", 
        "about",
        "skills"
    ]
    const isEditAllowed = Object.keys(req.body).every((field)=>allowedEditFields.includes(field))
    return isEditAllowed;
}


