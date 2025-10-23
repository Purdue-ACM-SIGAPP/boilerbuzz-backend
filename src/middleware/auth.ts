import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const auth = getAuth(req);

    if (!auth.userId) {
        res.status(401).json({ 
            error: 'Unauthorized', 
            message: 'Authentication is required to access this resource.' 
        });
        return;
    }

    console.log("Authorized: " + auth.userId);
    next();
};

export {
    requireAuth,
}