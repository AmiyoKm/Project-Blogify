import { Router } from "express";
import { getSessionHandler } from "../controller/session.controller";

const sessionRouter = Router();

sessionRouter.route("/").get(getSessionHandler);

export default sessionRouter