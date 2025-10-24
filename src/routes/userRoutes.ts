import { Router } from "express";

import {
  addUser,
  deleteUserData,
  getUserData,
  listUsers,
  updateUserSettings,
  queryPostersByTags
} from "../controllers/users/userController";

const router = Router();
export default router;

router.get("/user", listUsers);
router.get("/user/:id", getUserData);
router.post("/user", addUser);
router.post("/user/:id", updateUserSettings);
router.delete("/user/:id", deleteUserData);

