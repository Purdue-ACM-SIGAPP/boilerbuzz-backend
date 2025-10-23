import { Router } from "express";
import {
  getClub,
  getClubs,
  addClub,
  updateClub,
  deleteClub,

} from "@/controllers/clubs/clubsController";

const clubRouter = Router();

clubRouter.get("/club", getClubs);
clubRouter.get("/club/:id", getClub);
clubRouter.post("/club", addClub);
clubRouter.put("/club/:id", updateClub);
clubRouter.delete("/club/:id", deleteClub);




export default clubRouter;