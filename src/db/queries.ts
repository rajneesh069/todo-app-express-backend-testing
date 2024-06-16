import pool from "./index";

export async function insertIntoUsersTable(email: string, password: string) {
  const client = await pool.connect();
  try {
    const query =
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
    const values = [email, password];
    const res = await client.query(query, values);

    return {
      id: res.rows[0].id,
      email: res.rows[0].email,
    };
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  } finally {
    client.release();
    console.log("Disconnected from PostgreSQL");
  }
}

export async function insertIntoTodosTable(
  title: string,
  description: string,
  userId: number
) {
  const client = await pool.connect();
  try {
    const query =
      "INSERT INTO todos (title, description, user_id) VALUES ($1, $2, $3) RETURNING *";
    const values = [title, description, userId];
    const res = await client.query(query, values);

    return res.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    client.release();
    console.log("Disconnected from PostgreSQL");
  }
}

export async function getTodo(userId: number, todoId: number) {
  const client = await pool.connect();
  try {
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
    client.release();
    console.log("Disconnected from PostgreSQL");
  }
}

export async function getTodos(userId: number) {
  const client = await pool.connect();
  try {
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
    client.release();
    console.log("Disconnected from PostgreSQL");
  }
}

export async function deleteTodos(userId: number, todoId: number) {
  const client = await pool.connect();
  try {
    const query = `DELETE FROM TODOS WHERE user_id=$1 AND id=$2 RETURNING *`;
    const res = await client.query(query, [userId, todoId]);
    console.log(`Deleted ${res.rowCount} row(s)`);
    return res.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    client.release();
    console.log("Disconnected from PostgreSQL");
  }
}

export async function getUser(email: string, password: string) {
  const client = await pool.connect();
  try {
    const query = `SELECT * FROM users WHERE email=$1 AND password=$2`;
    const values = [email, password];
    const res = await client.query(query, values);
    if (res.rows.length === 0) {
      return null;
    }

    return {
      id: res.rows[0].id,
      email: res.rows[0].email,
    };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    client.release();
    console.log("Disconnected from PostgreSQL");
  }
}
