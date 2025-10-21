const config = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    APP_PORT: process.env.APP_PORT,
    CLERK_SECRET_KEY : process.env.CLERK_SECRET_KEY,
    CLERK_PUBLISHABLE_KEY : process.env.CLERK_PUBLISHABLE_KEY,
}
console.log("Config:", config);

if (process.env === undefined) {
    throw new Error("Environment variables are not defined");
}

if (process.env.DB_NAME === undefined) {
    throw new Error("DB_NAME is not defined in environment variables");
}

if (process.env.DB_HOST === undefined) {
    throw new Error("DB_HOST is not defined in environment variables");
}

if (process.env.DB_USER === undefined) {
    throw new Error("DB_USER is not defined in environment variables");
}

if (process.env.DB_PASSWORD === undefined) {
    throw new Error("DB_PASSWORD is not defined in environment variables");
}

if (process.env.DB_PORT === undefined) {
    throw new Error("DB_PORT is not defined in environment variables");
}
if (process.env.APP_PORT === undefined) {
    throw new Error("APP_PORT is not defined in environment variables");
}

export const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY || "YOUR_SECRET_KEY";
export default config;