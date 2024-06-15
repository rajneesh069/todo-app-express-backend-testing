import client from "./index";

export async function insertIntoUsersTable(email: string, password: string) {
  try {
    await client.connect();
    const query = "INSERT INTO users (email, password) VALUES ($1, $2)";
    const values = [email, password];
    const user = await client.query(query, values);
    console.log(user);
    return user.rowCount !== 0;
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
  userId: number
) {
  try {
    await client.connect();

    const query =
      "INSERT INTO todos (title, description, user_id) VALUES ($1, $2, $3)";
    const values = [title, description, userId];
    const res = await client.query(query, values);
    console.log(res);
    return res.rowCount !== 0;
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

    return res.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export async function deleteTodos(todoId: number, userId: number) {
  try {
    await client.connect();
    const query = `DELETE FROM TODOS WHERE user_id=$1 and id=$2`;
    const res = await client.query(query, [userId, todoId]);
    console.log(`Deleted ${res.rowCount} row(s)`);
    return res.rowCount !== 0;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    client.end();
  }
}

export async function getUser(email: string, password: string) {
  try {
    await client.connect();
    const query = `SELECT * FROM users WHERE email=$1 AND password=$2`;
    const values = [email, password];
    const res = await client.query(query, values);
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
