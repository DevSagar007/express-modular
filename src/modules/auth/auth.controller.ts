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

        const { refreshToken } = result;

        res.cookie("refreshToken", refreshToken, {
            secure: false, // in production => True
            httpOnly: true,
            sameSite: "lax"
        })
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

const refreshToken = async (req: Request, res: Response) => {
    try {
        const result = await authService.generateRefreshToken(req.cookies.refreshToken,);

        res.status(200).json({
            success: true,
            message: "Access token generated!",
            data: result,
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error,
        })
    }
};

export const authController = {
    registerUser,
    loginUser,
    refreshToken,
}