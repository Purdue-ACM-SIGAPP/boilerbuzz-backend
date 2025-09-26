import { Pool, type ConnectionConfig } from "pg";
import config from "./config";

const initOptions: ConnectionConfig = {
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  host: config.APP_PORT,
  database: config.DB_NAME,
};
const pool = new Pool(initOptions);

console.log("pool is connected");

export default pool;
