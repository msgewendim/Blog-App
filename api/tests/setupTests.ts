import { Pool } from 'pg';
let pool: Pool | null = null;

beforeAll(async () => {
  pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD ,
    port: parseInt(process.env.PORT || "5432")
  });
});


afterAll(async () => {
  if (pool) {
    await pool.end();
  }
});

export default pool;
