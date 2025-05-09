import {
  createDiseaseCodeUseCases,
  createPrescriptionUseCases,
  createPrescribedMedUseCases,
  createPrescribedGuideUseCases,
  createDiagnosisUseCases,
} from "../../application/use_cases/medicalStaffUsecases.js";
import {
  diagnosisSchema,
  diagnosisUpdateSchema,
  prescriptionSchema,
  prescriptionUpdateSchema,
  prescribedMedSchema,
  prescribedMedUpdateSchema,
  prescribedGuideSchema,
  prescribedGuideUpdateSchema,
} from "../../utils/validators.js";

const handleZodOrAppError = (res, error, fallbackStatus = 400) => {
  if (error.name === "ZodError") {
    const errors = error.errors.map((e) => ({
      field: e.path[0],
      message: e.message,
    }));
    return res.status(400).json({ errors });
  }
  const status = error.statusCode || fallbackStatus;
  const message = error.message || "Something went wrong";
  return res.status(status).json({ error: message });
};

//DISEASES
const { listDiseaseCodes, getDiseaseCodeById, getDiseaseCodeByValue } =
  createDiseaseCodeUseCases();

export const getDiseaseCodes = async (req, res) => {
  try {
    const filters = {
      search: req.query.search,
      limit: req.query.limit,
    };

    const diseaseCodes = await listDiseaseCodes(filters);

    return res.status(200).json({
      success: true,
      count: diseaseCodes.length,
      data: diseaseCodes,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getDiseaseCodeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const diseaseCode = await getDiseaseCodeById(id);

    return res.status(200).json({
      success: true,
      data: diseaseCode,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getDiseaseCodeByIcd10 = async (req, res) => {
  try {
    const { code } = req.params;
    const diseaseCode = await getDiseaseCodeByValue(code);

    return res.status(200).json({
      success: true,
      data: diseaseCode,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const importIcd10Codes = async (req, res) => {
  try {
    const codes = req.body;

    if (!Array.isArray(codes)) {
      return res.status(400).json({
        success: false,
        error: "Зөв форматтай өгөгдөл оруулна уу. JSON массив шаардлагатай.",
      });
    }

    const result = await importDiseaseCodes(codes);

    return res.status(201).json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

// Common Error Handler
const handleError = (res, error) => {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    error: message,
  });
};

//DIAGNOSIS
const {
  addDiagnosis,
  getDiagnosis,
  updateDiagnosis,
  removeDiagnosis,
  getPatientDiagnoses,
  getExaminationDiagnoses,
  getMedicalStaffDiagnoses,
} = createDiagnosisUseCases();

export const createDiagnosis = async (req, res) => {
  try {
    // Add the medical staff ID from authenticated user
    const diagnosisData = {
      ...req.body,
      medicalStaff: req.user.id,
    };

    // Validate input
    const validatedData = diagnosisSchema.parse(diagnosisData);

    const diagnosis = await addDiagnosis(validatedData);

    return res.status(201).json({
      success: true,
      message: "Оношийн мэдээлэл амжилттай бүртгэгдлээ!",
      data: diagnosis,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getDiagnosisById = async (req, res) => {
  try {
    const { id } = req.params;
    const diagnosis = await getDiagnosis(id);

    // Check if the user is authorized to view this diagnosis
    if (
      req.user.role === "Patient" &&
      diagnosis.patient._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        error: "Танд энэ оношийн мэдээллийг харах эрх байхгүй байна!",
      });
    }

    return res.status(200).json({
      success: true,
      data: diagnosis,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateDiagnosisById = async (req, res) => {
  try {
    const { id } = req.params;

    // Add staff ID for verification that they own this diagnosis
    const updateData = {
      ...req.body,
      staffId: req.user.id,
    };

    // Validate update data
    const validatedData = diagnosisUpdateSchema.parse(updateData);

    const updatedDiagnosis = await updateDiagnosis(id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Оношийн мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedDiagnosis,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteDiagnosisById = async (req, res) => {
  try {
    const { id } = req.params;
    const staffId = req.user.id;

    const result = await removeDiagnosis(id, staffId);

    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientDiagnosisList = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Check authorization if a patient is trying to access diagnoses
    if (req.user.role === "Patient" && patientId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Танд бусад өвчтөний мэдээллийг харах эрх байхгүй байна!",
      });
    }

    const diagnoses = await getPatientDiagnoses(patientId);

    return res.status(200).json({
      success: true,
      count: diagnoses.length,
      data: diagnoses,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getMyDiagnoses = async (req, res) => {
  try {
    // Function works for both patients and medical staff
    const userId = req.user.id;

    if (req.user.role === "Patient") {
      // If user is a patient, get their diagnoses
      const diagnoses = await getPatientDiagnoses(userId);
      return res.status(200).json({
        success: true,
        count: diagnoses.length,
        data: diagnoses,
      });
    } else if (req.user.role === "MedicalStaff") {
      // If user is medical staff, get diagnoses they created
      const diagnoses = await getMedicalStaffDiagnoses(userId);
      return res.status(200).json({
        success: true,
        count: diagnoses.length,
        data: diagnoses,
      });
    } else {
      return res.status(403).json({
        success: false,
        error: "Энэ үйлдлийг гүйцэтгэх эрх байхгүй байна!",
      });
    }
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

//PRESCRIPTION
const {
  addPrescription,
  getPrescription,
  updatePrescription,
  removePrescription,
  getPatientPrescriptions,
  getMedicalStaffPrescriptions,
} = createPrescriptionUseCases();

const {
  addPrescribedMed,
  getPrescribedMed,
  updatePrescribedMed,
  removePrescribedMed,
  getPrescriptionMeds,
  getPatientPrescribedMeds,
  getMedicalStaffPrescribedMeds,
} = createPrescribedMedUseCases();

const {
  addPrescribedGuide,
  getPrescribedGuide,
  updatePrescribedGuide,
  removePrescribedGuide,
  getPrescriptionGuides,
  getPatientPrescribedGuides,
  getMedicalStaffPrescribedGuides,
} = createPrescribedGuideUseCases();

// Prescription Controllers
export const createPrescription = async (req, res) => {
  try {
    // Add the medical staff ID from authenticated user
    const prescriptionData = {
      ...req.body,
      prescribedBy: req.user.id,
    };

    // Parse date if it's a string
    if (prescriptionData.date && typeof prescriptionData.date === "string") {
      prescriptionData.date = new Date(prescriptionData.date);
    }

    // Validate input
    const validatedData = prescriptionSchema.parse(prescriptionData);

    const prescription = await addPrescription(validatedData);

    return res.status(201).json({
      success: true,
      message: "Жорын мэдээлэл амжилттай бүртгэгдлээ!",
      data: prescription,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPrescriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const prescription = await getPrescription(id);

    // Check if patient is requesting their own prescription
    if (
      req.user.role === "Patient" &&
      prescription.patient._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        error: "Танд бусад өвчтөний жорын мэдээлэл харах эрх байхгүй байна!",
      });
    }

    return res.status(200).json({
      success: true,
      data: prescription,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updatePrescriptionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Add staff ID for verification that they own this prescription
    const updateData = {
      ...req.body,
      staffId: req.user.id,
    };

    // Parse date if it's a string
    if (updateData.date && typeof updateData.date === "string") {
      updateData.date = new Date(updateData.date);
    }

    // Validate update data
    const validatedData = prescriptionUpdateSchema.parse(updateData);

    const updatedPrescription = await updatePrescription(id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Жорын мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedPrescription,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deletePrescriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const staffId = req.user.id;

    const result = await removePrescription(id, staffId);

    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientPrescriptionList = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Check if patient is requesting their own prescriptions
    if (req.user.role === "Patient" && patientId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Танд бусад өвчтөний жорын мэдээлэл харах эрх байхгүй байна!",
      });
    }

    const prescriptions = await getPatientPrescriptions(patientId);

    return res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getMyPrescriptions = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role === "Patient") {
      // If user is a patient, get their prescriptions
      const prescriptions = await getPatientPrescriptions(userId);
      return res.status(200).json({
        success: true,
        count: prescriptions.length,
        data: prescriptions,
      });
    } else if (req.user.role === "MedicalStaff") {
      // If user is medical staff, get prescriptions they created
      const prescriptions = await getMedicalStaffPrescriptions(userId);
      return res.status(200).json({
        success: true,
        count: prescriptions.length,
        data: prescriptions,
      });
    } else {
      return res.status(403).json({
        success: false,
        error: "Энэ үйлдлийг гүйцэтгэх эрх байхгүй байна!",
      });
    }
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

// PrescribedMed Controllers
export const createPrescribedMed = async (req, res) => {
  try {
    // Add the medical staff ID from authenticated user
    const prescribedMedData = {
      ...req.body,
      medicalStaff: req.user.id,
    };

    // Validate input
    const validatedData = prescribedMedSchema.parse(prescribedMedData);

    const prescribedMed = await addPrescribedMed(validatedData);

    return res.status(201).json({
      success: true,
      message: "Эмийн жорын мэдээлэл амжилттай бүртгэгдлээ!",
      data: prescribedMed,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPrescribedMedById = async (req, res) => {
  try {
    const { id } = req.params;
    const prescribedMed = await getPrescribedMed(id);

    // Check if patient is requesting their own prescribed medication
    if (
      req.user.role === "Patient" &&
      prescribedMed.patient._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        error:
          "Танд бусад өвчтөний эмийн жорын мэдээлэл харах эрх байхгүй байна!",
      });
    }

    return res.status(200).json({
      success: true,
      data: prescribedMed,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updatePrescribedMedById = async (req, res) => {
  try {
    const { id } = req.params;

    // Add staff ID for verification that they own this prescribed med
    const updateData = {
      ...req.body,
      staffId: req.user.id,
    };

    // Validate update data
    const validatedData = prescribedMedUpdateSchema.parse(updateData);

    const updatedPrescribedMed = await updatePrescribedMed(id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Эмийн жорын мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedPrescribedMed,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deletePrescribedMedById = async (req, res) => {
  try {
    const { id } = req.params;
    const staffId = req.user.id;

    const result = await removePrescribedMed(id, staffId);

    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPrescriptionMedsList = async (req, res) => {
  try {
    const { prescriptionId } = req.params;
    const prescribedMeds = await getPrescriptionMeds(prescriptionId);

    // If user is a patient, verify they own the prescription through at least one med
    if (req.user.role === "Patient" && prescribedMeds.length > 0) {
      if (prescribedMeds[0].patient._id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          error:
            "Танд бусад өвчтөний эмийн жорын мэдээлэл харах эрх байхгүй байна!",
        });
      }
    }

    return res.status(200).json({
      success: true,
      count: prescribedMeds.length,
      data: prescribedMeds,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientPrescribedMedsList = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Check if patient is requesting their own prescribed meds
    if (req.user.role === "Patient" && patientId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error:
          "Танд бусад өвчтөний эмийн жорын мэдээлэл харах эрх байхгүй байна!",
      });
    }

    const prescribedMeds = await getPatientPrescribedMeds(patientId);

    return res.status(200).json({
      success: true,
      count: prescribedMeds.length,
      data: prescribedMeds,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getMyPrescribedMeds = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role === "Patient") {
      // If user is a patient, get their prescribed meds
      const prescribedMeds = await getPatientPrescribedMeds(userId);
      return res.status(200).json({
        success: true,
        count: prescribedMeds.length,
        data: prescribedMeds,
      });
    } else if (req.user.role === "MedicalStaff") {
      // If user is medical staff, get prescribed meds they created
      const prescribedMeds = await getMedicalStaffPrescribedMeds(userId);
      return res.status(200).json({
        success: true,
        count: prescribedMeds.length,
        data: prescribedMeds,
      });
    } else {
      return res.status(403).json({
        success: false,
        error: "Энэ үйлдлийг гүйцэтгэх эрх байхгүй байна!",
      });
    }
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

// PrescribedGuide Controllers
export const createPrescribedGuide = async (req, res) => {
  try {
    // Add the medical staff ID from authenticated user
    const prescribedGuideData = {
      ...req.body,
      medicalStaff: req.user.id,
    };

    // Validate input
    const validatedData = prescribedGuideSchema.parse(prescribedGuideData);

    const prescribedGuide = await addPrescribedGuide(validatedData);

    return res.status(201).json({
      success: true,
      message: "Зөвлөмжийн мэдээлэл амжилттай бүртгэгдлээ!",
      data: prescribedGuide,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPrescribedGuideById = async (req, res) => {
  try {
    const { id } = req.params;
    const prescribedGuide = await getPrescribedGuide(id);

    // Check if patient is requesting their own prescribed guide
    if (
      req.user.role === "Patient" &&
      prescribedGuide.patient._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        error:
          "Танд бусад өвчтөний зөвлөмжийн мэдээлэл харах эрх байхгүй байна!",
      });
    }

    return res.status(200).json({
      success: true,
      data: prescribedGuide,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updatePrescribedGuideById = async (req, res) => {
  try {
    const { id } = req.params;

    // Add staff ID for verification that they own this prescribed guide
    const updateData = {
      ...req.body,
      staffId: req.user.id,
    };

    // Validate update data
    const validatedData = prescribedGuideUpdateSchema.parse(updateData);

    const updatedPrescribedGuide = await updatePrescribedGuide(
      id,
      validatedData
    );

    return res.status(200).json({
      success: true,
      message: "Зөвлөмжийн мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedPrescribedGuide,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deletePrescribedGuideById = async (req, res) => {
  try {
    const { id } = req.params;
    const staffId = req.user.id;

    const result = await removePrescribedGuide(id, staffId);

    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPrescriptionGuidesList = async (req, res) => {
  try {
    const { prescriptionId } = req.params;
    const prescribedGuides = await getPrescriptionGuides(prescriptionId);

    // If user is a patient, verify they own the prescription through at least one guide
    if (req.user.role === "Patient" && prescribedGuides.length > 0) {
      if (prescribedGuides[0].patient._id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          error:
            "Танд бусад өвчтөний зөвлөмжийн мэдээлэл харах эрх байхгүй байна!",
        });
      }
    }

    return res.status(200).json({
      success: true,
      count: prescribedGuides.length,
      data: prescribedGuides,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientPrescribedGuidesList = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Check if patient is requesting their own prescribed guides
    if (req.user.role === "Patient" && patientId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error:
          "Танд бусад өвчтөний зөвлөмжийн мэдээлэл харах эрх байхгүй байна!",
      });
    }

    const prescribedGuides = await getPatientPrescribedGuides(patientId);

    return res.status(200).json({
      success: true,
      count: prescribedGuides.length,
      data: prescribedGuides,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getMyPrescribedGuides = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.role === "Patient") {
      // If user is a patient, get their prescribed guides
      const prescribedGuides = await getPatientPrescribedGuides(userId);
      return res.status(200).json({
        success: true,
        count: prescribedGuides.length,
        data: prescribedGuides,
      });
    } else if (req.user.role === "MedicalStaff") {
      // If user is medical staff, get prescribed guides they created
      const prescribedGuides = await getMedicalStaffPrescribedGuides(userId);
      return res.status(200).json({
        success: true,
        count: prescribedGuides.length,
        data: prescribedGuides,
      });
    } else {
      return res.status(403).json({
        success: false,
        error: "Энэ үйлдлийг гүйцэтгэх эрх байхгүй байна!",
      });
    }
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};
