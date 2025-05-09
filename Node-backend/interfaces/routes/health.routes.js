import express from "express";
const router = express.Router();

router.get("/health", (req, res) => {
  console.log("Health check hit");
  res.send("API is running...");
});

export default router;
