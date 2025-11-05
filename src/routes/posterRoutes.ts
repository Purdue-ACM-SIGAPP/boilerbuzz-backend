
import {
  addPoster,
  deletePoster,
  getPoster,
  getPosters,
  updatePoster,
  searchPosters,
  getPosterImage
} from "@/controllers/posters/postersController";
import { Router } from "express";

const posterRouter = Router();

posterRouter.get("/poster", getPosters);
posterRouter.get("/poster/:id", getPoster);
posterRouter.post("/poster", addPoster);
posterRouter.put("/poster/:id", updatePoster);
posterRouter.delete("/poster/:id", deletePoster);
posterRouter.post("/posters/search", searchPosters);
posterRouter.get("/poster/image/:id", getPosterImage);

export default posterRouter;
