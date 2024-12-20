import { Request, Response } from "express-serve-static-core";
import catchErrors from "../utils/catchErrors";
import { loginSchema, registerSchema } from "./auth.schemas";
import { createAccount, loginUser } from "../services/auth.service";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";
import { verifyToken } from "../utils/jwt";
import SessionModel from "../model/session.model";


export const registerHandler = catchErrors(
    async(req: Request, res: Response) => {
        const request = registerSchema.parse({
            ...req.body,
            userAgent : req.headers["user-agent"]
        })

        const {user , accessToken , refreshToken} = await createAccount(request)

        return setAuthCookies({res , accessToken , refreshToken}).json(user)
    }
    
)

export const loginHandler =  catchErrors(
    async(req : Request , res : Response)=>{
        const request = loginSchema.parse({
            ...req.body,
            userAgent : req.headers["user-agent"]
        })
        const { user , accessToken , refreshToken}  = await loginUser(request)
        return setAuthCookies({res , accessToken , refreshToken}).json(user)

    }

)

export const logoutHandler = catchErrors(
    async(req: Request , res : Response)=>{
        const accessToken = req.cookies.accessToken as string | undefined
        
        const {payload} = verifyToken(accessToken || "")
        if(payload){
            await SessionModel.findByIdAndDelete(payload.sessionId)
    }
         return clearAuthCookies(res).status(200).json({message : "Logged out"})
        
    }
)