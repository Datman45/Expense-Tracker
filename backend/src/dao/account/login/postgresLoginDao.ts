import { LoginDao } from ".";
import { pool } from "../../../db/connection";
import { User } from "../../../models";
import { LoginRequestBody } from "../../../types";

export class PostgresLoginDao implements LoginDao {
  async findUserByUsername(user: LoginRequestBody): Promise<User | undefined> {
    const response = await pool.query(
      "SELECT * FROM users where username = $1",
      [user.username],
    );

    const userData = response.rows[0];

    if (!userData) {
      return undefined;
    }

    return new User(
      userData.id,
      userData.username,
      userData.password,
      userData.firstName,
      userData.lastName,
    );
  }
}
