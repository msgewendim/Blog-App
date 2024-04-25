import { Request, Response } from "express";
import Post from "../models/Post";
import {PostService} from '../BL/PostService'

/*
This layer of the controller responsible for methods of CRUD, 
that imports BL/Service layer where the methods are implemented,
and gets the post data from Post layer. 
simply calls the CRUD methods modify them this makes modular way to handel the project.
*/
export class PostController {

    private postService :PostService;
    // the class takes the implemented POstService class & modify it.
    
    constructor (postService:PostService){
        this.postService = postService;
    }

    // adding method using express (re, req, .body ) library, 
    async addPost(req: Request, res: Response){
        const postData = req.body;
        try {
            await this.postService.addPost(postData);
            // status code : 201 = created, 200 = ok, 400 = error / not found
            res.status(201).send({ message: `Post created successfully` });
        } catch (error) {
            console.log(error);
            res.status(400).send((error as Error).message);
        }
    }

    // get method using express (+req.params.id = return the value of the id )
    async getPost(req: Request, res: Response){
        const postId = +req.params.id;
        try {
            // async & await is that we need wait until the function return, before we continue the program. 
            const post = await this.postService.getPost(postId);
            res.status(200).send(post);
        } catch(error) {
            res.status(404).send((error as Error).message);
        }
    }

    async updatePost(req: Request, res: Response){
        const postId = +req.params.id;
        const postData = req.body;
        try {
            // this method take 2 parameters the id and the content of the post need to be update
            await this.postService.updatePost(postId, postData);
            res.status(200).send({ message: `Post ${postId} updated successfully` });
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    async deletePost(req: Request, res: Response) {
        const postId = +req.params.id;
        try {
            // delete by id post
            await this.postService.deletePost(postId);
            res.status(200).send({ message: `Post ${postId} deleted successfully` });
        } catch(error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getAllPosts(req: Request, res: Response) : Promise<void> {
        try{
            // returns all posts in the DB, possible by filter & paging 
            const {cat, filter } = req.query;
            const uid = req.query.uid ? +req.query.uid as number : undefined;
            let page = req.query.page || 1;
            let  pageSize = req.query.pageSize || 5;
            const parsedPage = parseInt(page as string, 10)
            const parsedPageSize = parseInt(pageSize as string, 10)
            const posts = await this.postService.getAllPosts(parsedPage, parsedPageSize, uid , filter as string ,cat as string );
            if(posts.length === 0) {
                res.status(200).send({ message : "Not Found Any Posts"});
            }else{
                console.log(posts.length + " posts found");
                res.status(200).json({ message  : "All Found Posts", posts });
            }
        }catch(error){
            res.status(404).send((error as Error).message);
        }
    }
}