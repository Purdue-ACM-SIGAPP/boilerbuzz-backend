import { Router } from "express";
import {
  getClub,
  getClubs,
  addClub,
  updateClub,
  deleteClub,

} from "@/controllers/clubs/clubsController";
import { ClerkAuthMiddleware } from "@/middleware/auth";

const clubRouter = Router();


clubRouter.get("/club", ClerkAuthMiddleware, getClubs);
clubRouter.get("/club/:id", ClerkAuthMiddleware, getClub);
clubRouter.post("/club", ClerkAuthMiddleware, addClub);
clubRouter.put("/club/:id", ClerkAuthMiddleware, updateClub);
clubRouter.delete("/club/:id", ClerkAuthMiddleware, deleteClub);




export default clubRouter;