import "module-alias/register";

import cors from "cors";
import "dotenv/config";
import express from "express";

import _config from "./config";
import clubRouter from "@/routes/clubRoutes";
import userClubRouter from "@/routes/userClubRoutes";
import userSettingsRouter from "./routes/userSettingRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "@/docs/swagger.json";
import { clerkMiddleware, getAuth, clerkClient } from "@clerk/express";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware({ secretKey: _config.CLERK_SECRET_KEY }));

const PORT = _config.APP_PORT || 3000;

// INFO: For swagger dev purposes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/protected', async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req);
  if (!userId) {
     return res.status(401).json({ error: 'Unauthorized' });
  }

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId);

  return res.json({ user })
});

app.get("/api", (_req, res) => {// Test route
  res.status(200).json({ message: "Hello from the server,public endpoint " });
});

app.use("/api", clubRouter);
app.use("/api", userClubRouter);
app.use("/api", userSettingsRouter)




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
