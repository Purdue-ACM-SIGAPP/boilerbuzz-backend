import {
  addClub,
  deleteClub,
  getClub,
  getClubs,
  updateClub,
} from "@/controllers/clubs/clubsController";
import { Router } from "express";

const clubRouter = Router();

clubRouter.get("/club", getClubs);
clubRouter.get("/club/:id", getClub);
clubRouter.post("/club", addClub);
clubRouter.put("/club/:id", updateClub);
clubRouter.delete("/club/:id", deleteClub);

export default clubRouter;
