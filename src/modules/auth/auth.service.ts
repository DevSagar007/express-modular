import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken"
import config from "../../config";
import type { Iuser } from "../user/user.interface";

const registerUserIntoDB = async (payload: Iuser) => {
    const { name, email, password, age } = payload;

    const existingUser = await pool.query(
        `SELECT id FROM users WHERE email=$1`,
        [email],
    );
    if (existingUser.rows.length > 0) {
        throw new Error("User already exists with this email");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `
        INSERT INTO users(name, email, password, age) VALUES($1,$2,$3,$4)
        RETURNING id, name, email, age, is_active, created_at, updated_at
        `,
        [name, email, hashPassword, age],
    );

    return result.rows[0];
};

const loginUserIntoDB = async (payload: {
    email: string;
    password: string;
}) => {
    const { email, password } = payload;
    // 1. check if the user exist
    // 2. compare the password
    // 3. generate token
    const userData = await pool.query(
        `
        SELECT * FROM users WHERE email=$1
        `,
        [email],
    );
    if (userData.rows.length === 0) {
        throw new Error("invalid Credentials");
    }
    const user = userData.rows[0];
    console.log(user);

    const matchPassword = await bcrypt.compare(password, user.password);
    console.log(matchPassword);
    if (!matchPassword) {
        throw new Error("Invalid credential");
    }

    // Generate token
    const jwtpayload = {
        id: user.id,
        name: user.name,
        role: user.role,
        is_active: user.is_active,
        email: user.email,
    };

    const accessToken = jwt.sign(jwtpayload, config.jwt_secret, {
        expiresIn: "1d",
    });

    const refreshToken = jwt.sign(jwtpayload, config.refresh_secret, {
        expiresIn: "1d",
    });

    // return object
    return { accessToken, refreshToken };
};

export const authService = {
    registerUserIntoDB,
    loginUserIntoDB,
};
