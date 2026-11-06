import type { NextFunction, Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { resolveTlsa } from "node:dns";
import type { ROLES } from "../types";

const auth = (...roles: ROLES[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log("role check", roles);
        try {
            const token = req.headers.authorization;
            // 1.check if the token exists
            // 2.verify the token
            // 3.find the user into database
            // 4. if the user active or not?

            console.log(token);
            // check token validation
            if (!token) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized access!!",
                });
                return;
            };

            // token decoded
            const decoded = jwt.verify(
                token as string,
                config.jwt_secret as string,
            ) as jwt.JwtPayload;

            // check user database
            const userData = await pool.query(
                `SELECT * FROM users WHERE email=$1`,
                [decoded.email],
            );

            console.log(decoded);

            // user are not found in database
            if (userData.rows.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "User not found!!",
                });
                return;
            }

            const user = userData.rows[0];
            // user are not active
            if (!user?.is_active) {
                res.status(403).json({
                    success: false,
                    message: "Forbidden access!!",
                });
                return;
            }
            // console.log("Auth Role:", user.role);
            if(roles.length && !roles.includes(user.role)) {
                res.status(403).json({
                    success: false,
                    message: "Forbidden access!!, this role have no access!",
                });
            }

            req.user = decoded; //req: {user: {}}

            next();
        } catch (error) {
            next(error);
        }
    }
};

export default auth;