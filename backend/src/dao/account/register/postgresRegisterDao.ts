import { RegisterDao } from ".";
import { RegisterRequestBody } from "../../../types";
import { pool } from "../../../db/connection";
import bcrypt from "bcryptjs";
import { User } from "../../../models";

export class PostgresRegisterDao implements RegisterDao {
  async create(user: RegisterRequestBody): Promise<User | undefined> {
    const existingUser = await pool.query(
      "SELECT * FROM users where username = $1",
      [user.username],
    );

    if (existingUser.rows[0]) {
      return undefined;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const response = await pool.query(
      `Insert INTO users (username, password, "firstName", "lastName") values ($1, $2, $3, $4) RETURNING id, username, "firstName", "lastName"`,
      [user.username, hashedPassword, user.firstName, user.lastName],
    );

    return new User(
      response.rows[0].id,
      response.rows[0].username,
      response.rows[0].password,
      response.rows[0].firstName,
      response.rows[0].lastName,
    );
  }
}
