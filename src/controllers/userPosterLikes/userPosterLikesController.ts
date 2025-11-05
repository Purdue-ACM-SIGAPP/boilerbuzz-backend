import { Request, Response } from "express";
import pool from "@/libs/db.js";

const getNumPosterLikes = async (_req: Request, res: Response) => {
    try {
        const { poster_id } = _req.params;
        if (!poster_id) {
            res.status(400).json({ error: "Missing poster_id in params" });
        }
        const query = "SELECT COUNT(DISTINCT user_id) FROM user_poster_like WHERE poster_id = ($1)";
        const result = await pool.query(query, [poster_id]);
        res.status(200).json({res: result.rows[0]});
    } catch (err) {
        console.error("Error fetching likes:", err);
        res.status(500).json({ error: "Failed to fetch liked for poster" });
    }
};

const getPostersLikedByUser = async(_req : Request, res : Response) => {
    try {
        const { user_id } = _req.params;
        if (!user_id) {
            res.status(400).json({ error: "Missing user_id in params" });
        }
        const query = "SELECT DISTINCT poster_id FROM user_poster_like WHERE user_id = ($1)"
        const result = await pool.query(query, [user_id])
        res.status(200).json({res : result.rows[0]})
    } catch (err) {
        console.error("Error fetching liked posters:", err);
        res.status(500).json({ error: "Failed to fetch liked posters" });
    }
}

const addPosterLike = async (_req: Request, res: Response) => {
    try {
        const { user_id, poster_id } = _req.body;

        if (!user_id || !poster_id) {
            return res.status(400).json({ error: "Missing user_id or poster_id in body" });
        }

        const query = "INSERT INTO user_poster_like (user_id, poster_id) VALUES ($1, $2) RETURNING *";
        const result = await pool.query(query, [user_id, poster_id]);

        return res.status(201).json({ data: result.rows[0] });
    } catch (err: any) {
        // 23505 is Postgres unique_violation — avoid creating duplicate likes
        if (err && err.code === "23505") {
            return res.status(409).json({ error: "Like already exists" });
        }
        console.error("Error adding poster like:", err);
        return res.status(500).json({ error: "Failed to add poster like" });
    }
};

const deletePosterLike = async (_req: Request, res: Response) => {
    try {
        const { user_id, poster_id } = _req.params;
        if (!user_id || !poster_id) {
            return res.status(400).json({ error: "Missing user_id or poster_id in params" });
        }

        const query = "DELETE FROM user_poster_like WHERE user_id = ($1) AND poster_id = ($2)";
        const result = await pool.query(query, [user_id, poster_id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Like not found" });
        }

        return res.status(200).json({ data: result.rows[0] });
    } catch (err: any) {
        console.error("Error deleting poster like:", err);
        return res.status(500).json({ error: "Failed to delete poster like" });
    }
};

export { getNumPosterLikes, getPostersLikedByUser, addPosterLike, deletePosterLike };