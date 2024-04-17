import express, { Request, Response } from "express";
import { AuthController } from "../controllers/authController";
import { AuthService } from "../BL/AuthService";
import { AuthDAL } from "../DAL/Auth/authAccessData";

const authController = new AuthController(new AuthService(new AuthDAL()));
const router = express.Router();
router.post(
  "/register",
  async (req: Request, res: Response) => await authController.register(req, res)
);
router.post(
  "/login",
  async (req: Request, res: Response) => await authController.login(req, res)
);
router.post(
  "/google",
  async (req: Request, res: Response) =>
    await authController.googleAuth(req, res)
);

export default router;
