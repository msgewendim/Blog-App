import { UserDataAccessSql } from "../DAL/User/UserDataAccess";
import User from "../models/User";

export class UserService {
  static getUser(userData: User) {
    throw new Error("Method not implemented.");
  }
  private userDataAccessSql: UserDataAccessSql;

  constructor(userDataAccessSql: UserDataAccessSql) {
    this.userDataAccessSql = userDataAccessSql;
  }

  async addUser(userData: User): Promise<User> {
    try {
      const {username, email, password, img} = userData;

      if(!username || !email || !password){
        throw new Error("username, email and password are required");
      }
      const user = new User(0, username, email, password, img);
      const result = await this.userDataAccessSql.addUser(user);
      return result;
    } catch (error) {
      throw new Error(`Unable to add user: ${(error as Error).message}`);
    }
  }

  async getUser(username: string): Promise<User> {
    const user = await this.userDataAccessSql.getUser(username);
    if (!user) {
      throw new Error(`User ${username} not found`);
    }
    return user;
  }

  async updateUser(userId: number, updateData: Partial<User>): Promise<void> {
    try {
      await this.userDataAccessSql.updateUser(userId, updateData);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      await this.userDataAccessSql.deleteUser(userId);
    } catch (error) {
      throw new Error(`Unable to delete Post: ${(error as Error).message}`);
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const result = await this.userDataAccessSql.getAllUsers();
      return result;
    } catch (error) {
      throw new Error(`Not found any posts`);
    }
  }
}
