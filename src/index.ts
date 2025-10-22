import "module-alias/register";

import cors from "cors";
import "dotenv/config";
import express from "express";

import _config from "./config";
import clubRouter from "@/routes/clubRoutes";
import userSettingsRouter from "./routes/userSettingRoutes";
import userRouter from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = _config.APP_PORT || 3000;

app.use("/api", clubRouter);
app.use("/api", userRouter);
app.use("/api", userSettingsRouter)

app.get("/api", (_req, res) => {
  res.status(200).json({ message: "Hello from the server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
