import pool from "./index";

export async function createTables() {
  const client = await pool.connect();
  try {
    const userTableQuery = `
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    const todoTableQuery = `
      CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title VARCHAR(300) NOT NULL,
        description VARCHAR(500) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    await client.query(userTableQuery);
    await client.query(todoTableQuery);

    return "Table setup complete.";
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  } finally {
    client.release();
    console.log("Disconnected from PostgreSQL");
  }
}
