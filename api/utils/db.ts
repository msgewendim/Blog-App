import {Pool} from "pg"; 
import env from 'dotenv';

env.config()

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD ,
    port: parseInt(process.env.PORT || "5432")
}); 

export default pool;
