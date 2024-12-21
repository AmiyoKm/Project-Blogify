import { Request, Response } from "express-serve-static-core";
import catchErrors from "../utils/catchErrors";
import SessionModel from "../model/session.model";
import appAssert from "../utils/AppAsserts";


export const getSessionHandler = catchErrors(
    async(req : Request, res : Response)=>{
        // @ts-ignore
        const {userId} = req

        const sessions = await SessionModel.find({userId})
        appAssert(sessions , 404 , "No sessions found")
        return res.json(sessions)
    }
)