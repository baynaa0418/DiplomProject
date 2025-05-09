import express from "express";
import Prescription from "../domain/models/Prescription.model.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).json(prescription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;