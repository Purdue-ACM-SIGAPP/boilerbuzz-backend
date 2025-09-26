import { Request, Response } from "express";
import pool from "@/libs/db.js";
const getUserSettings = async (_req: Request, res: Response) => {
    try {
        const query = "SELECT * FROM UserSettings";
        const result = await pool.query(query);
        console.log(result)
        res.status(200).json({ message: "Fetched all user settings successfully" });
    } catch (err) {
        console.error("Error fetching clubs:", err);
        res.status(500).json({ error: "Failed to fetch clubs" });
    }
}

export {
  getUserSettings,
};