import { createPatientUseCases } from "../../application/use_cases/patientUseCases.js";
import { modifiedPatient } from "../../utils/formatter.js";
import { createError } from "../../utils/error.js";

const { listPatients } = createPatientUseCases();

//buh uwchtung jagsaah

export const listAllPatients = async (req, res) => {
  try {
    const patients = await listPatients();
    const safePatients = patients.map(modifiedPatient);
    res.status(200).json({
      message: "Read successfully!",
      count: safePatients.length,
      patients: safePatients,
    });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    res.status(status).json({ error: message });
  }
};
//uuriin uzlegiin medeellig harah
export const getOwnExaminations = async (req, res) => {
  try {
    const patientId = req.user.id; // токеноос гарч ирсэн өөрийн ID

    const examinations = await getPatientExaminations(patientId);

    return res.status(200).json({
      success: true,
      count: examinations.length,
      data: examinations,
    });
  } catch (error) {
    console.error("Error fetching own examinations:", error);
    return res
      .status(500)
      .json({ error: "Үзлэгийн түүх авахад алдаа гарлаа!" });
  }
};

// Patient-specific controllers for managing their own allergies

export const getMyAllergies = async (req, res) => {
  try {
    const patientId = req.user.id; // Get patient ID from the authenticated user
    const allergies = await getPatientAllergies(patientId);

    return res.status(200).json({
      success: true,
      count: allergies.length,
      data: allergies,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const createMyAllergy = async (req, res) => {
  try {
    const patientId = req.user.id; // Get patient ID from the authenticated user

    // Add patient ID to the request body
    const allergyData = {
      ...req.body,
      patient: patientId,
    };

    // Validate input
    const validatedData = allergySchema.parse(allergyData);

    const allergy = await addAllergy(validatedData);

    return res.status(201).json({
      success: true,
      message: "Харшлын мэдээлэл амжилттай бүртгэгдлээ!",
      data: allergy,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateMyAllergyById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = req.user.id; // Get patient ID from the authenticated user

    // Check if the allergy belongs to the patient
    const allergy = await findAllergyById(id);
    if (!allergy) {
      throw createError("Харшлын мэдээлэл олдсонгүй!", 404);
    }

    // Verify ownership
    if (allergy.patient.toString() !== patientId) {
      throw createError("Энэ харшлын мэдээлэлд хандах эрхгүй байна!", 403);
    }

    // Validate update data
    const validatedData = allergyUpdateSchema.parse(req.body);

    const updatedAllergy = await updateAllergy(id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Харшлын мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedAllergy,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteMyAllergyById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = req.user.id; // Get patient ID from the authenticated user

    // Check if the allergy belongs to the patient
    const allergy = await findAllergyById(id);
    if (!allergy) {
      throw createError("Харшлын мэдээлэл олдсонгүй!", 404);
    }

    // Verify ownership
    if (allergy.patient.toString() !== patientId) {
      throw createError("Энэ харшлын мэдээлэлд хандах эрхгүй байна!", 403);
    }

    await removeAllergy(id);

    return res.status(200).json({
      success: true,
      message: "Харшлын мэдээлэл амжилттай устгагдлаа!",
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

// Common Error Handler
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
