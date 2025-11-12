import { Router } from "express";
import {
  createBookmark,
  getAllBookmarks,
  getBookmark
} from "@/controllers/posters/userPosterBookmarkController";

const bookmarkRouter = Router();

bookmarkRouter.post("/userPosterBookmarks", createBookmark);
bookmarkRouter.get("/userPosterBookmarks", getAllBookmarks);
bookmarkRouter.get("/userPosterBookmarks/:userId/:posterId", getBookmark);

export default bookmarkRouter;
