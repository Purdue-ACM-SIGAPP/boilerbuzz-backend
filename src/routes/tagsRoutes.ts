import { Router } from "express";
import {
  getTag,
  getTags,
  addTag,
  updateTag,
  deleteTag,
  tagPoster,
  untagPoster

} from "@/controllers/tags/tagsController";

const tagRouter = Router();


tagRouter.get("/tags", getTags);
tagRouter.get("/tags/:id", getTag);
tagRouter.post("/tags", addTag);
tagRouter.put("/tags/:id", updateTag);
tagRouter.delete("/tags/:id", deleteTag);
tagRouter.post("/tagPoster/:tagId/:posterId", tagPoster);
tagRouter.delete("/tagPoster/:tagId/:posterId", untagPoster);





export default tagRouter;