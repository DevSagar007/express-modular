import type { NextFunction, Request, Response } from "express";

const auth = () => {
    (req: Request, res: Response, next: NextFunction) => {
        console.log("This is protected Route")
        next(req);
    };
}

export default auth