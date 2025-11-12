import "module-alias/register";

import cors from "cors";
import "dotenv/config";
import express from "express";

import clubRouter from "@/routes/clubRoutes";
import posterRouter from "@/routes/posterRoutes";
import _config from "./config";
import userClubRouter from "@/routes/userClubRoutes";
import userSettingsRouter from "./routes/userSettingRoutes";
import tagRouter from "./routes/tagsRoutes";
import userRouter from "./routes/userRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "@/docs/swagger.json";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = _config.APP_PORT || 3000;

// INFO: For swagger dev purposes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", clubRouter);
app.use("/api", userRouter);
app.use("/api", posterRouter);
app.use("/api", userSettingsRouter);
app.use("/api", userClubRouter);
app.use("/api", userSettingsRouter)
app.use("/api", tagRouter);

app.get("/api", (_req, res) => {
  res.status(200).json({ message: "Hello from the server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
