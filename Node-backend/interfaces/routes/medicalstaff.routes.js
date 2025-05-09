import express from "express";
import {
  getDiseaseCodes,
  getDiseaseCodeDetails,
  getDiseaseCodeByIcd10,
  createDiagnosis,
  getDiagnosisById,
  updateDiagnosisById,
  deleteDiagnosisById,
  getPatientDiagnosisList,
  getMyDiagnoses,
  createPrescription,
  getPrescriptionById,
  updatePrescriptionById,
  deletePrescriptionById,
  getPatientPrescriptionList,
  getMyPrescriptions,
  createPrescribedMed,
  getPrescribedMedById,
  updatePrescribedMedById,
  deletePrescribedMedById,
  getPrescriptionMedsList,
  getPatientPrescribedMedsList,
  createPrescribedGuide,
  getPrescribedGuideById,
  updatePrescribedGuideById,
  deletePrescribedGuideById,
  getPrescriptionGuidesList,
  getPatientPrescribedGuidesList,
} from "../controller/medicalstaff.controller.js";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

//middleware
router.use(authenticateJWT);

//=====================DISEASES=========================
router.get("/icd10", authorizeRole(["MedicalStaff"]), getDiseaseCodes);

router.get(
  "/icd10/:id",
  authorizeRole(["MedicalStaff"]),
  getDiseaseCodeDetails
);

router.get(
  "/icd10/code/:code",
  authorizeRole(["MedicalStaff"]),
  getDiseaseCodeByIcd10
);

//=====================DIAGNOSIS========================
router.post("/diagnosis", authorizeRole(["MedicalStaff"]), createDiagnosis);

// Get a specific diagnosis by ID (medical staff and the diagnosed patient)
router.get(
  "/diagnosis/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  getDiagnosisById
);

// Update an existing diagnosis (medical staff only)
router.put(
  "/diagnosis/:id",
  authorizeRole(["MedicalStaff"]),
  updateDiagnosisById
);

// Delete a diagnosis (medical staff only)
router.delete(
  "/diagnosis/:id",
  authorizeRole(["MedicalStaff"]),
  deleteDiagnosisById
);

// Get all diagnoses for a specific patient (for medical staff and the patient themselves)
router.get(
  "/patient/diagnosis/:patientId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPatientDiagnosisList
);

// Get all my diagnoses (for patients to see their own diagnoses or staff to see diagnoses they created)
router.get("/my-diagnoses", authorizeRole(["MedicalStaff"]), getMyDiagnoses);

//===================== PRESCRIPTIONS =====================
// Create a new prescription (medical staff only)
router.post(
  "/prescription",
  authorizeRole(["MedicalStaff"]),
  createPrescription
);

// Get prescription by ID (medical staff only)
router.get(
  "/prescription/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPrescriptionById
);

// Update prescription (medical staff only)
router.put(
  "/prescription/:id",
  authorizeRole(["MedicalStaff"]),
  updatePrescriptionById
);

// Delete prescription (medical staff only)
router.delete(
  "/prescription/:id",
  authorizeRole(["MedicalStaff"]),
  deletePrescriptionById
);

// Get all prescriptions for a specific patient
router.get(
  "/patient/:patientId/prescriptions",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPatientPrescriptionList
);

// Get all prescriptions created by the logged-in medical staff
router.get(
  "/my-prescriptions",
  authorizeRole(["MedicalStaff"]),
  getMyPrescriptions
);

//===================== PRESCRIBED MEDICATIONS =====================
// Create a new prescribed med (medical staff only)
router.post(
  "/prescription/med",
  authorizeRole(["MedicalStaff"]),
  createPrescribedMed
);

// Get prescribed med by ID (medical staff only)
router.get(
  "/prescription/med/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPrescribedMedById
);

// Update prescribed med (medical staff only)
router.put(
  "/prescription/med/:id",
  authorizeRole(["MedicalStaff"]),
  updatePrescribedMedById
);

// Delete prescribed med (medical staff only)
router.delete(
  "/prescription/med/:id",
  authorizeRole(["MedicalStaff"]),
  deletePrescribedMedById
);

// Get all prescribed meds for a specific prescription
router.get(
  "/prescription/:prescriptionId/meds",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPrescriptionMedsList
);

// Get all prescribed meds for a specific patient
router.get(
  "/patient/:patientId/meds",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPatientPrescribedMedsList
);

//===================== PRESCRIBED GUIDES =====================
// Create a new prescribed guide (medical staff only)
router.post(
  "/prescription/guide",
  authorizeRole(["MedicalStaff"]),
  createPrescribedGuide
);

// Get prescribed guide by ID (medical staff only)
router.get(
  "/prescription/guide/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPrescribedGuideById
);

// Update prescribed guide (medical staff only)
router.put(
  "/prescription/guide/:id",
  authorizeRole(["MedicalStaff"]),
  updatePrescribedGuideById
);

// Delete prescribed guide (medical staff only)
router.delete(
  "/prescription/guide/:id",
  authorizeRole(["MedicalStaff"]),
  deletePrescribedGuideById
);

// Get all prescribed guides for a specific prescription
router.get(
  "/prescription/:prescriptionId/guides",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPrescriptionGuidesList
);

// Get all prescribed guides for a specific patient
router.get(
  "/patient/:patientId/guides",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPatientPrescribedGuidesList
);
export default router;
