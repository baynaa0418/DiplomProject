import {
  signUp,
  signIn,
  signUpDoctor,
  signUpNurse,
  signUpAdmin,
} from "../controller/auth.controller.js";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup/patient", signUp);
router.post("/signin", signIn);
router.post("/signup/doctor", signUpDoctor);
router.post("/signup/nurse", signUpNurse);
router.post("/signup/admin", signUpAdmin);

// /verify endpoint нэмэх
router.get("/verify", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ valid: false, message: "Token байхгүй" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ valid: false, message: "Token хүчингүй" });
  }
});

export default router;
