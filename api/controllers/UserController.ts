import { Request, Response } from "express";
import { UserService } from "../BL/UserService";
import User from "../models/User";


export class UserController {

    private userService :UserService;    
    
    constructor (userService:UserService){
        this.userService = userService;
    }

    async addUser(req: Request, res: Response){
        const userData = req.body;
        try {
            await this.userService.addUser(userData as User);
            res.status(201).send({ message: `User created successfully` });
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getUser(req: Request, res: Response){
        const username = req.params.username;
        try {
            const user = await this.userService.getUser(username as string);
            res.status(200).send(user);
        } catch(error) {
            res.status(404).send((error as Error).message);
        }
    }

    async updateUser(req: Request, res: Response){
        const userId = +req.params.id;
        const userData = req.body;
        try {
            await this.userService.updateUser(userId, userData);
            res.status(200).send({ message: `User ${userId} updated successfully` });
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    async deleteUser(req: Request, res: Response) {
        const userId = +req.params.id;
        try {
            await this.userService.deleteUser(userId);
            res.status(200).send({ message: `User ${userId} deleted successfully` });
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    };

    async getAllUsers(req: Request, res: Response){
        try{
            const users = await this.userService.getAllUsers();
            res.status(200).json(users)
        }catch(error){
            console.error(error);
            res.status(400).json({error: 'NO Users Found!'});
        }
    }
}