import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";

export const ClerkAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    ClerkExpressWithAuth({
        // Add any options here
    })(req, res, (err) => {
        if (err) {
            return res.status(401).json({ error: "Unauthenticated" });
        }
        next();
    });
};
