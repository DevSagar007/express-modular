import type { Request, Response } from "express";
import { authService } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.registerUserIntoDB(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: error,
        })
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginUserIntoDB(req.body);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result,
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error,
        })
    }
}
export const authController = {
    registerUser,
    loginUser,
}