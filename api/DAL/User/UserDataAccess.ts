import User from "../../models/User";
import pool from "../../utils/db";
import { UserDataAccess } from "./InterfaceUserDAL";

export class UserDataAccessSql implements UserDataAccess<User> {
  async addUser(user: User): Promise<User> {
    const query =
      "INSERT INTO users (username, email, password, img) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [user.username, user.email, user.password, user.img];
    const {
      rows: [rows],
    } = await pool.query(query, values);
    return rows;
  }

  async deleteUser(userId: number): Promise<void> {
    const query = "DELETE FROM users WHERE id = $1";
    const { rowCount } = await pool.query(query, [userId]);
    if(rowCount){
      throw new Error(`User with ID ${userId} not found`);
    }
  }

  async updateUser(
    userId: number,
    updateUserData: Partial<User>
  ): Promise<void> {
    
    let query = "UPDATE users SET ";
    const updates: string[] = [];
    const values: (string | number)[] = [];

    Object.entries(updateUserData).forEach(([key, value], index) => {
      updates.push(`${key} = $${index + 1}`);
      values.push(value);
    });

    query += updates.join(", ") + " WHERE id = $" + (values.length + 1);
    values.push(userId);
    query += " RETURNING *";
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }

  }

  async getUser(username: string): Promise<User> {
    const query = "SELECT * FROM users WHERE username ILIKE $1";
    const {rows} = await pool.query(query, [`%${username}`]);
    return rows[0] as User;
  }

  async getAllUsers(): Promise<User[]> {
    const query = "SELECT * FROM users";
    const { rows } = await pool.query(query);
    return rows as User[];
  }
}
