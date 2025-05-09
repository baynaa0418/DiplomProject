import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";

import {
  createAllergy,
  getMyAllergies,
  updateMyAllergyById,
  deleteMyAllergyById,
  createMyAllergy,
  deleteAllergyById,
  getAllergyById,
  getPatientAllergyList,
  updateAllergyById,
} from "../controller/allergy.controller.js";

// Patient-specific routes for managing their own allergies
router.get("/my/allergies", authorizeRole(["Patient"]), getMyAllergies);

router.post("/my/allergies", authorizeRole(["Patient"]), createMyAllergy);

router.put(
  "/my/allergies/:id",
  authorizeRole(["Patient"]),
  updateMyAllergyById
);

router.delete(
  "/my/allergies/:id",
  authorizeRole(["Patient"]),
  deleteMyAllergyById
);

//=====================ALLERGY==========================
router.post(
  "/allergy",
  authorizeRole(["MedicalStaff", "Admin"]),
  createAllergy
);

router.get(
  "/allergy/:id",
  authorizeRole(["MedicalStaff", "Admin", "Patient"]),
  getAllergyById
);

router.put(
  "/allergy/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  updateAllergyById
);

router.delete(
  "/allergy/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  deleteAllergyById
);

// Get all allergies for a specific patient (medical staff and admin)
router.get(
  "/patient/allergy/:patientId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPatientAllergyList
);
