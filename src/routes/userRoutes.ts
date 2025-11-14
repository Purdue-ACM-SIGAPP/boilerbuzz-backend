import { Router } from "express";

import {
  addUser,
  deleteUserData,
  getUserData,
  listUsers,
  updateUserSettings,
} from "../controllers/users/userController";

const userRouter = Router();

userRouter.get("/user", listUsers);
userRouter.get("/user/:id", getUserData);
userRouter.post("/user", addUser);
userRouter.post("/user/:id", updateUserSettings);
userRouter.delete("/user/:id", deleteUserData);
export default userRouter;