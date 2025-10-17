import { Router } from "express";
import {
  getUserSettings,
  getUserSettingsByUserId,
  createUserSetting,
  deleteUserSetting,
  // putUserSetting
} from "@/controllers/userSettings/userSettingsController";

const userSettingsRouter = Router();

userSettingsRouter.get("/user/settings", getUserSettings);
userSettingsRouter.get("/user/settings/:id", getUserSettingsByUserId);
userSettingsRouter.post("/user/settings", createUserSetting);
// userSettingsRouter.put("/user/settings/:id", putUserSetting)
userSettingsRouter.delete("/user/settings/:id", deleteUserSetting)
export default userSettingsRouter;