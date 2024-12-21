import { NextFunction, Request, Response } from "express-serve-static-core";
import catchErrors from "../utils/catchErrors";
import appAssert from "../utils/AppAsserts";
import { UNAUTHORIZED } from "../constants/http";
import { verifyToken } from "../utils/jwt";


export const authenticate = catchErrors(
    async (req: Request, res: Response, next: NextFunction) => {
        const accessToken = req.cookies.accessToken as string | undefined
       appAssert(accessToken , UNAUTHORIZED , "Access token not found")
       const {payload ,error} = verifyToken(accessToken)
         appAssert(payload , UNAUTHORIZED , "Invalid access token")
         // @ts-ignore
         req.userId = payload.userId
         // @ts-ignore
         req.sessionId = payload.sessionId
         next()
    }
)