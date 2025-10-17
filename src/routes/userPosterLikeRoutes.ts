import { Router } from "express";
import {
  getNumPosterLikes,
  getPostersLikedByUser,
  addPosterLike
  // putUserSetting
} from "@/controllers/userPosterLikes/userPosterLikesController";

const userPosterLikeRouter = Router();

userPosterLikeRouter.get("/user/poster/like/:poster_id", getNumPosterLikes);
userPosterLikeRouter.get("/poster/user/like/:user_id", getPostersLikedByUser);
userPosterLikeRouter.post("/user/poster/like", addPosterLike)

export default userPosterLikeRouter;