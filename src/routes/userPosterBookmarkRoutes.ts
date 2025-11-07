import { Router } from "express";
import {
  createBookmark,
  getAllBookmarks,
  getBookmark
} from "@/controllers/posters/userPosterBookmarkController";

const bookmarkRouter = Router();

bookmarkRouter.post("/userPosterBookmarks/create", createBookmark);
bookmarkRouter.post("/userPosterBookmarks/getAll", getAllBookmarks);
bookmarkRouter.post("/userPosterBookmarks/get", getBookmark);

export default bookmarkRouter;
