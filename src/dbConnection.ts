import { Pool, type ConnectionConfig } from "pg";
import config from "./config";

const initOptions: ConnectionConfig = {
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  database: config.DB_NAME,
};
const pool = new Pool(initOptions);

console.log("Pool is connected!");

export default pool;
