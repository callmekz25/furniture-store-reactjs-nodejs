import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
export const PRODUCTION_ENV = process.env.NODE_ENV === "production";
