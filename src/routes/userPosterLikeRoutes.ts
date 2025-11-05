import { Router } from "express";
import {
  getNumPosterLikes,
  getPostersLikedByUser,
  addPosterLike,
  deletePosterLike
  // putUserSetting
} from "@/controllers/userPosterLikes/userPosterLikesController";

const userPosterLikeRouter = Router();

userPosterLikeRouter.get("/poster/like/:poster_id", getNumPosterLikes);
userPosterLikeRouter.get("/user/like/:user_id", getPostersLikedByUser);
userPosterLikeRouter.delete("/poster/like/:user_id/:poster_id", deletePosterLike);
userPosterLikeRouter.post("/poster/like", addPosterLike);

export default userPosterLikeRouter;