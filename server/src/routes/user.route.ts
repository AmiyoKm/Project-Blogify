import { Router } from "express";
import { getUserHandler } from "../controller/user.controller";

const userRouter = Router();

userRouter.route("/").get(getUserHandler);


export default userRouter