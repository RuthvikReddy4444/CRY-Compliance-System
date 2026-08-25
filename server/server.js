import partnerRoutes from "./routes/partnerRoutes.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/partners", partnerRoutes);
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CRY Compliance API is running",
  });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});