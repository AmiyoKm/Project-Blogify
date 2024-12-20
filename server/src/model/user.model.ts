import mongoose from "mongoose";
import { UserDocument } from "../types/Schema";
import { comparePassword, hashPassword } from "../utils/bcrypt";

const userSchema = new mongoose.Schema<UserDocument>({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : "user"
    },
    avatar : {
        type : String
    }
}, {timestamps : true}
);

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        next();
    }
     this.password = await hashPassword(this.password);
    next()
})

userSchema.methods.comparePassword = async function(password : string){
    return await comparePassword(password , this.password);
}
userSchema.methods.omitPassword = function(){
    const user = this.toObject()
    delete user.password;
    return user;
}


const UserModel = mongoose.model<UserDocument>("User" , userSchema);
export default UserModel;