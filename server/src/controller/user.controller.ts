import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import UserModel from "../model/user.model";
import appAssert from "../utils/AppAsserts";
import { OK } from "../constants/http";


export const getUserHandler = catchErrors(
    async (req: Request, res: Response) => {
        // @ts-ignore
        const { userId } = req
        appAssert(userId, 401, "Unauthorized")
        const user = await UserModel.findById(userId)
        appAssert(user, 404, "User not found")
        return res.status(OK).json(user.omitPassword())
    }
)