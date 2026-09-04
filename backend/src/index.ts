import "dotenv/config";
import cors from "cors";
import express from "express";
import { authRouter } from "./routes/auth.js";
import { reviewRouter } from "./routes/review.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use("/api/auth", authRouter);
app.use("/api/review", reviewRouter);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
