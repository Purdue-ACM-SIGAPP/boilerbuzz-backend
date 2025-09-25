import { Pool } from 'pg';
import dbConfigs from './dbConfig';

const pool = new Pool(dbConfigs());
module.exports = pool;