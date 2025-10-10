import { Router } from "express";
import {
  getPoster,
  getPosters,
  addPoster,
  updatePoster,
  deletePoster,
} from "@/controllers/posters/postersController";

const posterRouter = Router();


posterRouter.get("/poster", getPosters);
posterRouter.get("/poster/:id", getPoster);
posterRouter.post("/poster", addPoster);
posterRouter.put("/poster/:id", updatePoster);
posterRouter.delete("/poster/:id", deletePoster);




export default posterRouter;