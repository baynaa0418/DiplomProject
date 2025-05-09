import express from "express";

import {
  createVitalSigns,
  getVitalSignsById,
  updateVitalSignsById,
  deleteVitalSignsById,
  getPatientVitalSignsList,
  getPatientLatestVitalSigns,
  getPatientVitalSignsByDateRange,
  getMyVitalSignsByStaff,
  getMyVitalSigns,
  getPatientVitalSignsByDateRange,
  getVitalSignsById,
} from "../controller/vitals.controller";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/vitalsigns", authorizeRole(["MedicalStaff"]), createVitalSigns);

router.get(
  "/vitalsigns/:id",
  authorizeRole(["MedicalStaff"]),
  getVitalSignsById
);

router.put(
  "/vitalsigns/:id",
  authorizeRole(["MedicalStaff"]),
  updateVitalSignsById
);

router.delete(
  "/vitalsigns/:id",
  authorizeRole(["MedicalStaff"]),
  deleteVitalSignsById
);

router.get(
  "/patient/:patientId/vitalsigns",
  authorizeRole(["MedicalStaff"]),
  getPatientVitalSignsList
);

router.get(
  "/patient/:patientId/vitalsigns/latest",
  authorizeRole(["MedicalStaff"]),
  getPatientLatestVitalSigns
);

router.get(
  "/patient/:patientId/vitalsigns/daterange",
  authorizeRole(["MedicalStaff"]),
  getPatientVitalSignsByDateRange
);

router.get(
  "/vitalsigns/my/recorded",
  authorizeRole(["MedicalStaff"]),
  getMyVitalSignsByStaff
);

router.get(
  "/vitalsigns/my/latest",
  authorizeRole(["Patient"]),
  getMyLatestVitalSigns
);

//VITAL SIGNS
router.get("/vitalsigns/:id", authorizeRole(["Patient"]), getVitalSignsById);

router.get(
  "/vitalsigns/my/recorded",
  authorizeRole(["Patient"]),
  getMyVitalSigns
);

router.get(
  "/vitalsigns/my/daterange",
  authorizeRole(["Patient"]),
  (req, res, next) => {
    req.params.patientId = req.user.id;
    next();
  },
  getPatientVitalSignsByDateRange
);

export default router;
