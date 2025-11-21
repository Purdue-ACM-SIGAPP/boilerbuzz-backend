import { Request, Response } from "express";
import pool from "@/libs/db";

const getRepliesByPosterId = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Missing user id in params" });
    }

    try {
        const query = "SELECT * FROM reply WHERE poster_id = $1";
        const result = await pool.query(query, [id]);

        return res.status(200).json({ res: result });
    } catch (err) {
        console.error("Error fetching replies:", err);
        return res.status(500).json({ error: "Failed to fetch replies" });
    }
};

const getRepliesByUserId = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Missing user id in params" });
    }

    try {
        const query = "SELECT * FROM reply WHERE user_id = $1";
        const result = await pool.query(query, [id]);

        return res.status(200).json({ res: result });
    } catch (err) {
        console.error("Error fetching replies:", err);
        return res.status(500).json({ error: "Failed to fetch replies" });
    }
};

const createReply = async (req: Request, res: Response) => {
    const required = ["poster_id", "user_id", "msg"];
    const missing = required.filter(field => !req.body[field]);
    if (missing.length != 0) {
        return res.status(400).json({ error: `Missing ${missing.join(", ")} in body` });
    }

    const values = required.map(field => req.body[field]);
    try {
        const data = await pool.query(
            "INSERT INTO Reply (poster_id, user_id, msg) ($1, $2, $3)",
            values
        );
        return res.status(200).json(data.rows);
    } catch (err) {
        console.error("Error creating reply", err);
        return res.status(500).json({
            error: "Failed to create reply",
            details:
                "There was an internal server error while creating reply. Please try again later.",
            technical_error: err.message,
        
        });
    }
};

const updateReply = async (req: Request, res: Response) => {
    const required = ["id", "msg"];

    const missing = required.filter(field => !req.body[field]);
    if (missing.length != 0) {
        return res.status(400).json({ error: `Missing ${missing.join(", ")} in body` });
    }

    const values = required.map(field => req.body[field]);
    try {
        const data = await pool.query(
            "UPDATE Reply SET msg = $1 WHERE id = $2",
            values
        );
        return res.status(200).json(data.rows);
    } catch (err) {
        console.error("Error updating reply", err);
        return res.status(500).json({
            error: "Failed to update reply",
            details:
                "There was an internal server error while updating the reply. Please try again later.",
            technical_error: err.message,
        
        });
    }
};

const deleteReply = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Missing reply id in params" });
    }

    try {
        const data = await pool.query(
            "DELETE FROM Reply WHERE id = $1",
            [id]
        );
        return res.status(200).json(data.rows);
    } catch (err) {
        console.error("Error deleting reply:", err);
        return res.status(500).json({
            error: "Failed to delete reply",
            details:
                "There was an internal server error while deleting the reply. Please try again later.",
            technical_error: err.message,
        });
    }
}

export {
    getRepliesByPosterId,
    getRepliesByUserId,
    createReply,
    updateReply,
    deleteReply
};