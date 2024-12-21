import mongoose from "mongoose";

declare global {
    namespace Express {
        interface Request {
            userId : mongoose.Types.ObjectId | string
            sessionId : mongoose.Types.ObjectId | string
        }
    }
}
export{}