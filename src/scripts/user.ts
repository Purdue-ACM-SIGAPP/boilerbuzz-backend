import { Router, Request, Response } from "express";
import { Pool, Result } from "pg";

const router = Router();

export default router;

declare var pool: Pool;

const getUserData = async (request: Request, response: Response) => {
  try {
    const result = await pool.query("SELELCT * FROM UserSettings WHERE userid = $1", [
      request.params.id,
    ]);

    console.log("Update user data request sent");
    response.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    response.status(500).json("Failed to fetch user data");
  }
};

const deleteUserData = async (request: Request, response: Response) => {
  try {
    const result = await pool.query("DELETE FROM UserSettings WHERE userid = $1", [
      request.params.id,
    ]);

    console.log("Delete user data request processed");
    response.status(200);
  } catch (error) {
    console.error(error);
    response.status(500).json("Failed to delete user data");
  }
};

router.get("/user/:id", getUserData);
router.delete("/user/:id", deleteUserData);
