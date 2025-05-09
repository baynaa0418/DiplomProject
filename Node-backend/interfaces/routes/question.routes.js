import express from "express";
import { createQuestion } from "../controller/question.controller.js";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "",
  authenticateJWT,
  authorizeRole(["MedicalStaff"]),
  createQuestion
);

export default router;
