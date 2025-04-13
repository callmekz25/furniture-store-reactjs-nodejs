import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
export const PRODUCTION_ENV = process.env.NODE_ENV === "production";
export const LIMIT = 20;
export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
export const MOMO_ACCESS_KEY = process.env.MOMO_ACCESS_KEY;
export const MOMO_SECRET_KEY = process.env.MOMO_SECRET_KEY;
export const MOMO_URL = process.env.MOMO_URL;
