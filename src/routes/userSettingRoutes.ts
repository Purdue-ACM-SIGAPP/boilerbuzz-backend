import {
  createUserSetting,
  deleteUserSetting,
  getUserSettings,
  getUserSettingsByUserId,
} from "@/controllers/userSettings/userSettingsController";
import { Router } from "express";

const userSettingsRouter = Router();

userSettingsRouter.get("/user/settings", getUserSettings);
userSettingsRouter.get("/user/settings/:id", getUserSettingsByUserId);
userSettingsRouter.post("/user/settings", createUserSetting);
// userSettingsRouter.put("/user/settings/:id", putUserSetting)
userSettingsRouter.delete("/user/settings/:id", deleteUserSetting);
export default userSettingsRouter;
