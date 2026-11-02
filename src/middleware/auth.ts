import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const auth = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header) {
        res.status(401).json({
            success: false,
            message: "Unauthorized access!!",
        });
        return;
    };
    next();
};

export default auth;