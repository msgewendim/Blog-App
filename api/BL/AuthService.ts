import { AuthDAL } from "../DAL/Auth/authAccessData";
import User, { GoogleUser } from "../models/User";
import bcrypt from "bcrypt";

export class AuthService {
  private authDal: AuthDAL;

  constructor(authDal: AuthDAL) {
    this.authDal = authDal;
  }

  async register(user: User): Promise<User> {
    try {
      const result = await this.authDal.register(user);
      return result;
    } catch (error) {
      throw new Error(`Unable to add user: ${(error as Error).message}`);
    }
  }

  async login(username: string, inputPassword: string): Promise<User> {
    const userFromDb = await this.authDal.login(username);
    console.log("user from db: ", userFromDb);
    if (!userFromDb) {
      throw new Error(`User with username :${username} not found`);
    }
    // check if passwords are matching
    const hash = userFromDb.password;

    const isCorrectPassword = await bcrypt.compare(inputPassword, hash);
    console.log("isCorrectPassword: ", isCorrectPassword);
    if (!isCorrectPassword) {
      throw new Error("Wrong Username or Password!");
    }
    return userFromDb;
  }

  // async getGoogleAuthToken(code: string) : Promise<GoogleRefreshToken> {

  //     const url = "https://oauth2.googleapis.com/token";

  //     const values = {
  //         client_id : process.env.GOOGLE_CLIENT_ID as string,
  //         code,
  //         client_secret : process.env.GOOGLE_CLIENT_SECRET as string,
  //         redirect_uri : process.env.GOOGLE_REDIRECT_URL as string,
  //         grant_type : "authorization_code"
  //     }
  //     try {
  //         const response = await fetch(url, {
  //             method : "POST",
  //             headers : {
  //                 "Content-Type" : "application/x-www-form-urlencoded"
  //             },
  //             body: new URLSearchParams(values) // convert object to query string
  //         })
  //         if (!response.ok) {
  //             throw new Error(`Failed to fetch token: Status code ${response.status}`);
  //         }

  //         const data = await response.json();
  //         return data as GoogleRefreshToken;
  //     } catch (error) {
  //         console.log((error as Error).message);
  //         throw new Error(`Unable to get token: ${(error as Error).message}`);
  //     }
  // }

  async addGoogleUser(user: User): Promise<User> {
    try {
      const userToAdd = new User(0,user.username, user.email, user.password, user.img);
      const result = await this.authDal.addGoogleUser(userToAdd);
      console.log("google user added successfully to db: ", result);
      return result;
    } catch (error) {
      throw new Error(`Unable to add user: ${(error as Error).message}`);
    }
  }

  async getGoogleUserFromDB(email: string): Promise<User | null | GoogleUser> {
    const user = await this.authDal.getUser(email);
    if (!user) {
      return null;
    }
    return user;
  }
}
