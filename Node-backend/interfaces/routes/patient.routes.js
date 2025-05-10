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
import Patient from "../../domain/models/Patient.model.js";

const router = express.Router();

// Бүх үйлчлүүлэгчдийг авах public route
router.get("/", PatientController.getAllPatients);

// Бүх үйлчлүүлэгчдийг авах route
router.get(
  "/view",
  authenticateJWT,
  authorizeRole(["Admin", "MedicalStaff"]),
  async (req, res) => {
    try {
      const patients = await Patient.find().select('-password');
      res.status(200).json({
        message: "Read successfully!",
        data: patients
      });
    } catch (error) {
      const status = error.statusCode || 500;
      const message = error.message || "Internal server error";
      res.status(status).json({ error: message });
    }
  }
);

// ID-р үйлчлүүлэгч авах route
router.get(
  "/:id",
  authenticateJWT,
  authorizeRole(["Admin", "MedicalStaff"]),
  async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id).select('-password');
      if (!patient) {
        return res.status(404).json({ error: 'Үйлчлүүлэгч олдсонгүй' });
      }
      res.status(200).json({
        message: "Read successfully!",
        data: patient
      });
    } catch (error) {
      const status = error.statusCode || 500;
      const message = error.message || "Internal server error";
      res.status(status).json({ error: message });
    }
  }
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
