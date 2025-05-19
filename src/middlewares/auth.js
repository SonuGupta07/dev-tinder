 const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthorised = token=="xyz";
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorized request")
    }
    else{
        next();
    }

}
const userAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthorised = token=="xyz";
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorized request")
    }
    else{
        next();
    }

}
module.exports={
    adminAuth,
    userAuth
}