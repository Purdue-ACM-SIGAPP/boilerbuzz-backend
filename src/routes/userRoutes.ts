import { Router } from "express";

import {
  addUser,
  deleteUserData,
  getUserData,
  listUsers,
  
} from "../controllers/users/userController";

const router = Router();
export default router;

router.get("/user", listUsers);
router.get("/user/:id", getUserData);
router.post("/user", addUser);
router.delete("/user/:id", deleteUserData);
