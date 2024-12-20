import { Request } from "express";
import appAssert from "../utils/AppAsserts";
import { CreateAccountParams, LoginParams } from "../types/auth";
import UserModel from "../model/user.model";
import { CONFLICT } from "../constants/http";
import { refreshTokenSignOptions, signToken } from "../utils/jwt";
import SessionModel from "../model/session.model";


export const createAccount = async (data : CreateAccountParams) => {
    const existingUser = await UserModel.exists({email : data.email});

    appAssert(!existingUser , CONFLICT , "Email already exists");

    const user = await UserModel.create({
        email : data.email,
        password : data.password,
        name : data.name,
        role : data.role,
        avatar : data.avatar
    })
    const userId = user._id;
    const session = await SessionModel.create({
        userId,
        userAgent: data.userAgent
    })
    const sessionId = session._id;

    const refreshToken = signToken({ sessionId: session._id }, refreshTokenSignOptions)

    const accessToken = signToken({ userId, sessionId: session._id })

    return { user: user.omitPassword() , accessToken ,  refreshToken}
}

export const loginUser = async ( data : LoginParams )=>{
    const user = await UserModel.findOne({email : data.email})
    appAssert(user , 401 , "Invalid email , User not found")

    const isPasswordMatch = await user.comparePassword(data.password)
    appAssert(isPasswordMatch , 401 , "Invalid password")

    const userId = user._id;

    const userAgent = data.userAgent

    const session = await SessionModel.create({
        userId ,
        userAgent
    })
    const sessionId = session._id;
    const sessionInfo = {
        sessionId,
        userAgent
    }
    const refreshToken = signToken({sessionId} , refreshTokenSignOptions)
    const accessToken = signToken({...sessionInfo , userId})

    return { user: user.omitPassword(), accessToken, refreshToken }

}

export const refreshUserAccessToken = async (refreshToken : string)=>{

}