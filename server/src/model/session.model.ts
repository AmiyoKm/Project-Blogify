import mongoose from "mongoose";
import { SessionDocument } from "../types/Schema";
import { thirtyDaysFromNow } from "../utils/date";
const sessionSchema = new mongoose.Schema<SessionDocument>({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        index : true
    },
    userAgent : {type : String},
    createdAt : {type : Date, default : Date.now , required : true},
    expiresAt : {type : Date, required : true , default : thirtyDaysFromNow()}  
})

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema)

export default SessionModel;