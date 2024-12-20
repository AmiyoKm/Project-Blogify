import AppErrorCode from "../constants/appErrorCodes"
import assert from 'node:assert';
import { HttpStatusCode } from "../constants/http"
import AppError from "./AppError"



type AppAsserts = (
    condition: any,
    httpsStatusCode: HttpStatusCode,
    message: string,
    appErrorCode?: AppErrorCode
)=> asserts condition

const appAssert : AppAsserts = (
    condition ,
    httpStatusCode ,
    message ,
    appErrorCode

)=>assert(condition , new AppError(httpStatusCode , message, appErrorCode ) )

export default appAssert

