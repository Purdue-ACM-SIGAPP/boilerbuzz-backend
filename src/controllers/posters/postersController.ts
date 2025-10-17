
import { Request, Response } from "express";
import pool from "@/libs/db.js";

const getPosterImage = async (req: Request, res: Response) => {
    try {
        console.log("Fetching poster image...");
        const posterId = req.params.id;

        const query = "SELECT img_path FROM poster WHERE id = $1";
        const values = [posterId];

        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Poster not found",
                details: `No poster found with id ${posterId}`,
            });
        }

        const img_path = result.rows[0].img_path;
        return res.status(200).json({ img_path });
    } catch (err) {
        console.error("Error fetching poster image:", err);
        return res.status(500).json({
            error: "Failed to fetch poster image",
            details:
                "There was an internal server error while retrieving the poster image. Please try again later.",
            technical_error: err instanceof Error ? err.message : String(err),
        });
    }
};

export { getPosterImage };