import client from "./index";

export async function createTables() {
  try {
    await client.connect();
    const userTableQuery = `
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
      `;
    const users = await client.query(userTableQuery);
    console.log(users);
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
    const todos = await client.query(todoTableQuery);
    console.log(todos);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    client.end();
  }
}
