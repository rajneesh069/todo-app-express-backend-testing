import pg from "pg";
const { Client } = pg;

const client = new Client({
  database: "todos",
  user: "rajneesh",
  password: "12345",
  port: 5432,
  host: "localhost",
});

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
    await client.end();
  }
}

export async function insertIntoUsersTable(email: string, password: string) {
  try {
    await client.connect();
    const query = "INSERT INTO users (email, password) VALUES ($1, $2)";
    const values = [email, password];
    const user = await client.query(query, values);
    console.log(user);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export async function insertIntoTodosTable(
  title: string,
  description: string,
  userId: string
) {
  try {
    await client.connect();

    const query =
      "INSERT INTO users (title, description, userId) VALUES ($1, $2, $3)";
    const values = [title, description, userId];
    const res = await client.query(query, values);
    console.log(res);
    if (res.rows.length === 0) {
      return null;
    }
    return res.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export async function getTodo(userId: number, todoId: number) {
  try {
    await client.connect();
    const query = `
    SELECT * FROM todos
    WHERE user_id = $1 AND id = $2
    `;

    const values = [userId, todoId];
    const res = await client.query(query, values);
    if (res.rows.length == 0) {
      return null;
    }

    return res.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export async function getTodos(userId: number) {
  try {
    await client.connect();
    const query = `
    SELECT * FROM todos
    WHERE user_id = $1
    `;

    const values = [userId];
    const res = await client.query(query, values);
    if (res.rows.length == 0) {
      return null;
    }

    return res.rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}
