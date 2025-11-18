import User from "../model/Usermodel.js"


export const getCurrentUser = async (req,res)=>{
    try{
  let user = User.findById(req.userId).select("-password")
  if(!user){
    return res.status.json(404)({message:"user is not found"})
  }
    }catch(error){
console.error("error");
        return res.status(500).json({ message: `getcurrentUser error ${error.message}` })
    }
    
}