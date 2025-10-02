import { Router } from "express";
import {
    createAndAdministrateClub,
    inviteAdmin,
    removeAdmin,

} from "@/controllers/clubs/userClubController";

const userClubRouter = Router();

userClubRouter.post("/userClub/create", createAndAdministrateClub);
/*
 * curl -X POST http://localhost:3000/api/userClub/create \
  -H "Content-Type: application/json" \
  -d '{"userID": 67}'  
 */
userClubRouter.post("/userClub/invite", inviteAdmin);
/*
 * curl -X POST http://localhost:3000/api/userClub/invite \
  -H "Content-Type: application/json" \
  -d '{"userID": 67, "clubID": 3}'
 */
userClubRouter.delete("/userClub/remove", removeAdmin);
/*
 * curl -X DELETE http://localhost:3000/api/userClub/remove \
  -H "Content-Type: application/json" \
  -d '{"userID": 67, "clubID": 4}' 
 */


export default userClubRouter;