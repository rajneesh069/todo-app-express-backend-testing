import pg from "pg";
const { Client } = pg;

const client = new Client({
  database: "todos",
  user: "rajneesh",
  password: "12345",
  port: 5432,
  host: "localhost",
});

export default client;
