import express from "express";
import {
  createQuestionnaire,
  getQuestionnaireById,
  updateQuestionnaireById,
  deleteQuestionnaireById,
  getPatientQuestionnaireList,
  getMyQuestionnaires,
  getExaminationQuestionnaireList,
  getQuestionnaires,
} from "../controller/questionnaire.controller.js";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

// medical staff id, patient id, examination id aar query dej avah
router.get(
  "/",
  authenticateJWT,
  authorizeRole(["MedicalStaff", "Admin"]),
  getQuestionnaires
);

router.post(
  "",
  authenticateJWT,
  authorizeRole(["MedicalStaff"]),
  createQuestionnaire
);

router.get(
  "/:id",
  authorizeRole(["MedicalStaff", "Admin", "Patient"]),
  getQuestionnaireById
);

router.put("/:id", authorizeRole(["MedicalStaff"]), updateQuestionnaireById);

router.delete("/:id", authorizeRole(["MedicalStaff"]), deleteQuestionnaireById);

// Get all questionnaires for a specific examination
router.get(
  "/:examinationId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getExaminationQuestionnaireList
);

// Get all questionnaires for a specific patient (for medical staff)
router.get(
  "/:patientId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPatientQuestionnaireList
);

export default router;
