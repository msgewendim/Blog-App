import express, { Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../BL/UserService";
import { UserDataAccessSql } from "../DAL/User/UserDataAccess";

const router = express.Router();

const userController = new UserController(
  new UserService(new UserDataAccessSql())
);

router.get(
  "/:username",
  async (req: Request, res: Response) => await userController.getUser(req, res)
);
router.get(
  "/",
  async (req: Request, res: Response) =>
    await userController.getAllUsers(req, res)
);
router.post(
  "/",
  async (req: Request, res: Response) => await userController.addUser(req, res)
);
router.delete(
  "/:id",
  async (req: Request, res: Response) =>
    await userController.deleteUser(req, res)
);
router.put(
  "/:id",
  async (req: Request, res: Response) =>
    await userController.updateUser(req, res)
);

export default router;
