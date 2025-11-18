
import  Mongoose  from "mongoose";
 

const userschema = new  Mongoose.Schema({
     name:{
        type:String,
        required:true
     },
      password:{
        type:String,
        required:true
     },
 email:{
        type:String,
        required:true,
        unique:true
     },
      carddate:{
        type:Object,
         default:{}
     },


},{timestamps:true,minimize:false})

const User = Mongoose.model("User",userschema)
export default User;