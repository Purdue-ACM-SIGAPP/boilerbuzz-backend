import { Router } from "express";
import {
  getClub,
  getClubs,
  addClub,
  updateClub,
  deleteClub,

} from "@/controllers/poster/posterController";

const posterRouter = Router();


posterRouter.get("/club", getClubs);
posterRouter.get("/club/:id", getClub);
posterRouter.post("/club", addClub);
posterRouter.put("/club/:id", updateClub);
posterRouter.delete("/club/:id", deleteClub);




export default posterRouter;