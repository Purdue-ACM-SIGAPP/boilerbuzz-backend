const dbConfig = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
}

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

export default dbConfig;