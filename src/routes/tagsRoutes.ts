import { Router } from "express";
import {
  getTag,
  getTags,
  addTag,
  updateTag,
  deleteTag,


} from "@/controllers/tags/tagsController";

const tagRouter = Router();


tagRouter.get("/tags", getTags);
tagRouter.get("/tags/:id", getTag);
tagRouter.post("/tags", addTag);
tagRouter.put("/tags/:id", updateTag);
tagRouter.delete("/tags/:id", deleteTag);





export default tagRouter;