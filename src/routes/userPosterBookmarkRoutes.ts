import { Router } from "express";
import {
  createBookmark,
  getAllBookmarks,
  getBookmark,
  deleteBookmark,
} from "@/controllers/posters/userPosterBookmarkController";

const bookmarkRouter = Router();

bookmarkRouter.post("/userPosterBookmarks", createBookmark);
bookmarkRouter.get("/userPosterBookmarks/:userId", getAllBookmarks);
bookmarkRouter.get("/userPosterBookmarks/:userId/:posterId", getBookmark);
bookmarkRouter.delete("/userPosterBookmarks/:userId/:posterId", deleteBookmark);

export default bookmarkRouter;
