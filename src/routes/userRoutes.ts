import { Router } from "express";

import {
  addUser,
  deleteUserData,
  getUserData,
  listUsers,
  updateUserSettings,
  syncClerkUser,
} from "../controllers/users/userController";

const router = Router();

router.get("/user", listUsers);
router.post("/user/sync", syncClerkUser);
router.get("/user/:id", getUserData);
router.post("/user", addUser);
router.post("/user/:id", updateUserSettings);
router.delete("/user/:id", deleteUserData);

export default router;