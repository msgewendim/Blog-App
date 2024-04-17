import User from "../../models/User";
import { AuthAccess } from "./InterfaceAuth";
import pool from "../../utils/db";
import bcrypt from "bcrypt";
import { QueryResult } from "pg";

export class AuthDAL implements AuthAccess<User> {
  async addGoogleUser(user: User): Promise<User> {
    const query =
      "INSERT INTO users (username, email, password, img) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [user.username, user.email, user.password, user.img];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async getUser(email: string): Promise<User> {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    console.log("pool from db succeed");
    return result.rows[0];
  }

  async register(user: User): Promise<User> {
    // check Existing USER
    const query = "SELECT * FROM users WHERE email = $1 OR username = $2";
    const result = await pool.query(query, [user.email, user.username]);

    if (result.rows.length > 0) {
      // found user with same username
      console.log("User already Exists - dal", result.rows[0]);
      throw new Error("User already Exists");
    }

    const saltRounds = 10; // encrypting rounds
    const q =
      "INSERT INTO users (username, email, password, img) VALUES ($1, $2, $3, $4) RETURNING *";

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    if (!hashedPassword) {
      console.error("Error hashing password:");
    }

    // console.log("hash: ",hashedPassword);
    const values = [user.username, user.email, hashedPassword, user.img];
    // console.log("values: ", values);
    const userRegistered: QueryResult<User> = await pool.query(q, values);
    if (!userRegistered.rowCount) {
      console.log("error adding to user bd");
    }

    console.log(`user registered Successfully!`);
    return userRegistered.rows[0];
  }

  async login(username: string, _password?: string): Promise<User> {
    const query = "SELECT * FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);
    if (result.rows[0].length === 0) {
      console.log("error from db- user not found!");
      throw new Error(`user ${username} not found`);
    }
    console.log("pool from db succeed");
    return result.rows[0];
  }
}
