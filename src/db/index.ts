import { Pool } from "pg";

const pool = new Pool({
  database: "postgres",
  user: "rajneesh",
  password: "12345",
  port: 5432,
  host: "localhost",
});

export default pool;
