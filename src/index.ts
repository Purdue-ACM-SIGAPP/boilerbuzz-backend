import "module-alias/register";

import cors from "cors";
import "dotenv/config";
import express from "express";

import _config from "./config";
import clubRouter from "@/routes/clubRoutes";

//Authentication Middleware
import { clerkMiddleware } from '@clerk/express'
import { clerkClient, getAuth } from '@clerk/express'



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

const PORT = _config.APP_PORT || 3000;


app.get("/api", (_req, res) => {// Test route
  res.status(200).json({ message: "Hello from the server,public endpoint " });
});

// validate Clerk auth for all routes under /api then pass to clubRouter
app.use('/api', clerkMiddleware(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req)
  console.log( "you made it to the protected area, userId:", userId);
  if (!userId) {
     return res.status(401).json({ error: 'Unauthorized' })    
  }
  res.status(200).json({ message: "you made it to the protected area" });
  console.log( "you made it to the protected area, userId:", userId);

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId)

  return res.json({ user })
}, clubRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
