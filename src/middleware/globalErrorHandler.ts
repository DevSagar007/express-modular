import type { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err?.type === "entity.parse.failed") {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON in request body",
            error: err.body,
        });
    }

    const statusCode = err?.statusCode || err?.status || 500;

    res.status(statusCode).json({
        success: false,
        message: err?.message || "Internal Server Error",
    });
};

export default globalErrorHandler;
