import { Router } from "express";
import { getRepliesByPosterId, getRepliesByUserId, createReply, updateReply, deleteReply } from "@/controllers/replies/repliesController";
const replyRouter = Router();

replyRouter.get("/reply/poster/:id", getRepliesByPosterId);
replyRouter.get("/reply/user/:id", getRepliesByUserId);
replyRouter.post("/reply", createReply);
replyRouter.put("/reply/:id", updateReply);
replyRouter.delete("/reply/:id", deleteReply);