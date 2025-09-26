import { Router } from "express";
import {
  getUserSettings
} from "@/controllers/userSettings/userSettingsController";

const userSettingsRouter = Router();

userSettingsRouter.get("/user/settings", getUserSettings);

export default userSettingsRouter;