/*import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";

export const ClerkAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    ClerkExpressWithAuth({ })(req, res, (err) => {
        if (err) {
            return res.status(401).json({ error: "Unauthenticated" });
        }
        next();
    });
};
*/
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};