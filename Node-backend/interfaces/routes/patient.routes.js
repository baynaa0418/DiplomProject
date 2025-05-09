import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";
import PatientController, { getPatientById } from "../controller/patientController.js";
import {
  listAllPatients,
  getOwnExaminations,
} from "../controller/patient.controller.js";
import {
  getDiagnosisById,
  getMyDiagnoses,
  getMyPrescribedGuides,
  getMyPrescribedMeds,
  getMyPrescriptions,
  getPrescribedGuideById,
  getPrescribedMedById,
  getPrescriptionById,
  getPrescriptionGuidesList,
  getPrescriptionMedsList,
} from "../controller/medicalstaff.controller.js";

const router = express.Router();

// Бүх үйлчлүүлэгчдийг авах public route
router.get("/", PatientController.getAllPatients);

// Шинээр нэмэх: ID-р үйлчлүүлэгч авах route
router.get(
  "/:id",
  authenticateJWT,
  authorizeRole(["Admin", "MedicalStaff"]),
  getPatientById
);

router.get(
  "/view",
  authenticateJWT,
  authorizeRole(["Admin", "MedicalStaff"]),
  listAllPatients
);

router.get(
  "/examinations",
  authenticateJWT,
  authorizeRole(["Patient"]),
 getOwnExaminations
);

//DIAGNOSIS
router.get(
  "/my-diagnoses",
  authenticateJWT,
  authorizeRole(["Patient"]),
  getMyDiagnoses
);

// Get a specific diagnosis by ID (patient can only view their own diagnoses)
router.get(
  "/diagnosis/:id",
  authenticateJWT,
  authorizeRole(["Patient"]),
  getDiagnosisById
);

//===================== PATIENT PRESCRIPTIONS =====================
// Get all prescriptions for the logged-in patient
router.get("/my-prescriptions", authorizeRole(["Patient"]), getMyPrescriptions);

// Get a specific prescription by ID
router.get(
  "/prescription/:id",
  authorizeRole(["Patient"]),
  getPrescriptionById
);

//===================== PATIENT MEDICATIONS =====================
// Get all medications for the logged-in patient
router.get("/my-medications", authorizeRole(["Patient"]), getMyPrescribedMeds);

// Get a specific medication by ID
router.get("/medication/:id", authorizeRole(["Patient"]), getPrescribedMedById);

// Get all medications for a specific prescription
router.get(
  "/prescription/:prescriptionId/medications",
  authorizeRole(["Patient"]),
  getPrescriptionMedsList
);

//===================== PATIENT GUIDES =====================
// Get all guides for the logged-in patient
router.get("/my-guides", authorizeRole(["Patient"]), getMyPrescribedGuides);

// Get a specific guide by ID
router.get("/guide/:id", authorizeRole(["Patient"]), getPrescribedGuideById);

// Get all guides for a specific prescription
router.get(
  "/prescription/:prescriptionId/guides",
  authorizeRole(["Patient"]),
  getPrescriptionGuidesList
);

export default router;
