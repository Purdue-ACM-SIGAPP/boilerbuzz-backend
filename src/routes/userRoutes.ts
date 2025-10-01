import { Router } from "express";

import {
  addPoster,
  deleteUserData,
  getUserData,
  listUsers,
  updateUserSettings,
} from "../controllers/users/userController";

const router = Router();
export default router;

router.get("/user", listUsers);
router.get("/user/:id", getUserData);
router.post("/user", addPoster);
router.post("/user/:id", updateUserSettings);
router.delete("/user/:id", deleteUserData);
