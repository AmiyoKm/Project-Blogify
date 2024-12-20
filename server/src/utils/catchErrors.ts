import { NextFunction, Request, Response } from "express-serve-static-core";

type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<any>;


const catchErrors =( controller : AsyncController)=>async (req: Request, res: Response, next: NextFunction) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        next(error);
    }
}

export default catchErrors