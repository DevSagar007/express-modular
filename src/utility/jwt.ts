import jwt from "jsonwebtoken";
import config from "../config";

type JwtPayloadInput = string | Buffer | object;

export const signToken = (
    payload: JwtPayloadInput,
    secret: string,
    expiresIn: string,
) => {
    return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
};

export const generateAccessToken = (payload: JwtPayloadInput) => {
    return signToken(payload, config.jwt_secret, config.access_expires_in);
};

export const generateRefreshToken = (payload: JwtPayloadInput) => {
    return signToken(payload, config.refresh_secret, config.refresh_expires_in);
};

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as jwt.JwtPayload;
};
