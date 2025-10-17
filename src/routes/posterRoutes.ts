import { Router } from "express";
import { getPosterImage } from "@/controllers/posters/postersController.js";

const clubRouter = Router();


clubRouter.get("/poster/image/:id", getPosterImage);


export default clubRouter;