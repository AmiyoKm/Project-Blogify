import { ErrorRequestHandler, Response } from "express";
import AppError from "../utils/AppError";

const handleAppError = (res: Response, err: AppError) => {
    return res.status(err.statusCode).json({
        message : err.message,
        errorCode : err.errorCode
    })
}


const errorHandler : ErrorRequestHandler = (err, req, res : Response, next) => {
    console.error(`PATH : ${req.path}` , err)

    if(err instanceof AppError){
         handleAppError(res, err)
         return
    }
}
export default errorHandler