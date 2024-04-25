import { Response, Request, CookieOptions } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/User";
import { AuthService } from "../BL/AuthService";
import { generateJwtToken } from "../middlewares/jwt";
import {GoogleUser} from "../models/User";

const accessTokenCookieOptions: CookieOptions = {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    domain: "localhost",
    path: "/",  
    sameSite: "lax",
    secure: false,
};


export class AuthController {

    private authService : AuthService;

    constructor(authService : AuthService) {
        this.authService = authService;
    }

    async register(req : Request, res: Response) {
        const userData = req.body;
        const user = new User(userData.id, userData.username, userData.email, userData.password, userData.img);
        try {
            const result = await this.authService.register(user);
            res.status(201).send({ message: `User created successfully`, result });
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async login(req : Request, res : Response){
        const username = req.body.username;
        const inputPassword = req.body.password;
        try {
            const user = await this.authService.login(username, inputPassword);
            const {password, ...otherUserData} = user
            console.log(otherUserData);
            // const token = generateJwtToken(username);   
        
            // res.cookie("user_token", token, {
            //     httpOnly : true,
            //     maxAge: 900000
            // })
            res.status(200).send({messge : "logged in successfully", otherUserData});
        } catch (error) {
            res.status(400).json((error as Error).message);
        }
    };

    async googleAuth(req : Request, res : Response){
        try {            
            // get user info from req.body credentials
            const { credential } = req.body;            

            if(!credential) {
                throw new Error("credentials is null");
            }

            const googleUserInfo  = jwt.decode(credential as string)

            if(!googleUserInfo) {
                throw new Error("googleUser is null");
            }
            const { name, email, picture, email_verified } = googleUserInfo as GoogleUser;
            const userData : User = {
                id : 0, // db id
                username : name,
                email : email,
                img : picture,
                password : picture // use google picture string as password #not secure #not recommended
            };
            if(!email_verified) {
                throw new Error("Google email not verified");
            }
            // check if user exists, if not store user info in database
            const userFromDb = await this.authService.getGoogleUserFromDB(userData.email) as User;
            if(!userFromDb) {
                console.log("google User not found in db , creating new user");
                const { password, ...newUser } = await this.authService.addGoogleUser(userData) // store user info in db 
                if(!newUser) {
                    throw new Error("Failed to create user");
                }
                console.log("new user created successfully", newUser);
                return res.status(200).send(newUser);  
            };

            // if user exists, return user info to frontend
            const { password, ...user } = userFromDb;

            // // return user info to frontend
            const token = generateJwtToken(req.sessionID)  
            // res.session.cookie("user_token", token, {
            //     httpOnly : true,
            //     maxAge: 900000
            // })
            // req.cookie("user_token", token, accessTokenCookieOptions);
            return res.status(200).send(user);
        } catch (error) {
            res.status(401).json((error as Error).message);
        }
    }

};
