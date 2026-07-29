import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";

import blogRoutes from "./routes/blog.routes.js";

import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to QuillMind API",
  });
});
app.use("/api/auth", authRoutes);

app.use("/api/blogs", blogRoutes);


app.use("/api/dashboard", dashboardRoutes);

export default app;