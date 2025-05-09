import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";

import {
  createExamination,
  getMedicalStaffExamHistory,
  updateExaminationById,
  getExaminationById,
  deleteExaminationById,
  getPatientExaminationHistory,
  getExaminationDiagnosisList,
} from "../controller/examination.controller.js";

const router = express.Router();
router.use(authenticateJWT);  
router.post("/exam/", authorizeRole(["Admin","MedicalStaff"]), createExamination);

router.get(
  "/exam/:id",
  authorizeRole(["doctor", "Admin"]),
  getExaminationById
);

router.put("/exam/:id", authorizeRole(["doctor"]), updateExaminationById);

router.delete(
  "/exam/:id",
  authorizeRole(["MedicalStaff"]),
  deleteExaminationById
);

// Get all examinations for a specific patient
router.get(
  "/patient/exam/:patientId",
  authorizeRole(["doctor", "Admin"]),
  getPatientExaminationHistory
);

//doctor gets their exams
router.get(
  "/my-examinations",
  authenticateJWT,
  authorizeRole(["MedicalStaff", "Admin"]),
  getMedicalStaffExamHistory
);

// Get all diagnoses for a specific examination (for medical staff and the patient)
router.get(
  "/examination/diagnosis/:examinationId",
  authorizeRole(["doctor", "Admin"]),
  getExaminationDiagnosisList
);

// Get all diagnoses for a specific examination (patient can only view their own examinations)
router.get(
  "/examination/:examinationId/diagnoses",
  authenticateJWT,
  authorizeRole(["Patient"]),
  getExaminationDiagnosisList
);

export default router;
