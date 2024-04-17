import express, { Request, Response } from "express";
import { PostController } from "../controllers/PostController";
import { PostService } from "../BL/PostService";
import { PostDataAccessSQL } from "../DAL/Post/PostDataAccessSQL";

const router = express.Router();
const postController = new PostController(
  new PostService(new PostDataAccessSQL())
);

router.get(
  "/",
  async (req: Request, res: Response) =>
    await postController.getAllPosts(req, res)
);
router.post(
  "/",
  async (req: Request, res: Response) => await postController.addPost(req, res)
);
router.get(
  "/:id",
  async (req: Request, res: Response) => await postController.getPost(req, res)
);
router.delete(
  "/:id",
  async (req: Request, res: Response) =>
    await postController.deletePost(req, res)
);
router.put(
  "/:id",
  async (req: Request, res: Response) =>
    await postController.updatePost(req, res)
);

export default router;
