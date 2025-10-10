
import { Request, Response } from "express";
import pool from "@/libs/db.js";

const createAndAdministrateClub = async (req: Request, res: Response) => {
    try {
        console.log("Creating and administering a club...");
        const { userId } = req.body;

        // Validate required fields
        if (!userId) {
            return res.status(400).json({
                error: "Missing required field",
                details: "userId is required"
            });
        }

        const createClubResult = await pool.query(
            'INSERT INTO Club DEFAULT VALUES RETURNING id'
        );

        await pool.query(
            'INSERT INTO UserClub (user_id, club_id) VALUES ($1, $2) RETURNING *',
            [userId, createClubResult.rows[0].id]
        );

        return res.status(201).json({
            success: true,
            message: "User successfully added as club administrator",
            data: createClubResult.rows[0]
        });
    }
    catch (err) {
        console.error("Error creating club administration:", err);
        return res.status(500).json({
            error: "Failed to create and administrate club",
            details: "There was an internal server error while creating the club administration relationship. Please try again later.",
            technical_error: err instanceof Error ? err.message : String(err),
        });
    }
};

const inviteAdmin = async (req: Request, res: Response) => {
    try {
        console.log("Inviting user as admin...");
        const { userId, clubId } = req.body;

        // Validate required fields
        if (!userId || !clubId) {
            return res.status(400).json({
                error: "Missing required fields",
                details: "Both userId and clubId are required"
            });
        }

        const check = await pool.query(
            'SELECT EXISTS(SELECT 1 FROM UserClub WHERE user_id=$1 AND club_id=$2) AS exists',
            [userId, clubId]
        );
        const exists = check.rows[0].exists;

        if (exists) {
            return res.status(409).json({ error: 'User already an admin for that club' });
        }

        const result = await pool.query(
            'INSERT INTO UserClub (user_id, club_id) VALUES ($1, $2) RETURNING *',
            [userId, clubId]
        );

        return res.status(201).json({
            success: true,
            message: "User successfully added as club administrator",
            data: result.rows[0]
        });
    }
    catch (err) {
        console.error("Error fetching goals:", err);
        return res.status(500).json({
            error: "Failed to invite user as admin",
            details:
                "There was an internal server error while retrieving all goals. Please try again later.",
            technical_error: err instanceof Error ? err.message : String(err),
        });
    }
}

const removeAdmin = async (req: Request, res: Response) => {
    try {
        console.log("Removing user as admin...");

        const { userId, clubId } = req.body;

        // Validate required fields
        if (!userId || !clubId) {
            return res.status(400).json({
                error: "Missing required fields",
                details: "Both userId and clubId are required"
            });
        }

        await pool.query(
            'DELETE FROM UserClub WHERE user_id = $1 AND club_id = $2 RETURNING *',
            [userId, clubId]
        );

        const remainingUserClubs = await pool.query(
            'SELECT COUNT(*) as count FROM UserClub WHERE club_id = $1',
            [clubId]
        );

        let clubDeleted = false;
        if (parseInt(remainingUserClubs.rows[0].count) === 0) {
            // No other UserClubs reference this club, so delete it
            await pool.query('DELETE FROM Club WHERE id = $1', [clubId]);
            clubDeleted = true;
        }

        await pool.query('COMMIT');

        return res.status(200).json({
            success: true,
            message: "UserClub relationship deleted successfully",
            userClubDeleted: true,
            clubDeleted: clubDeleted
        });
    }
    catch (err) {
        console.error("Error fetching goals:", err);
        return res.status(500).json({
            error: "Failed to remove user as admin",
            details:
                "There was an internal server error while retrieving all goals. Please try again later.",
            technical_error: err.message,
        });
    }
}

export {
    createAndAdministrateClub,
    inviteAdmin,
    removeAdmin,
}