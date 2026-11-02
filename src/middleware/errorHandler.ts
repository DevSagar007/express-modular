import type { NextFunction, Request, Response } from "express";

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err?.type === "entity.parse.failed") {
        res.status(400).json({
            success: false,
            message: "Invalid JSON in request body",
            error: err.body,
        });
        return;
    }

    res.status(500).json({
        success: false,
        message: err?.message || "Internal server error",
    });
};

export default errorHandler;
