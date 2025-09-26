
import { Request, Response } from "express";

const createAndAdministrateClub = async (_req: Request, res: Response) => {
    try {
        console.log("Creating and administering a club...");
    }
    catch (err) {
        console.error("Error fetching goals:", err);
        res.status(500).json({
            error: "Failed to create and administrate club",
            details:
                "There was an internal server error while retrieving all goals. Please try again later.",
            technical_error: err.message,
        });
    }
};

const inviteAdmin = async (_req: Request, res: Response) => {
    try {
        console.log("Inviting user as admin...");
    }
    catch (err) {
        console.error("Error fetching goals:", err);
        res.status(500).json({
            error: "Failed to invite user as admin",
            details:
                "There was an internal server error while retrieving all goals. Please try again later.",
            technical_error: err.message,
        });
    }
}

const removeAdmin = async (_req: Request, res: Response) => {
    try {
        console.log("Removing user as admin...");


    }
    catch (err) {
        console.error("Error fetching goals:", err);
        res.status(500).json({
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