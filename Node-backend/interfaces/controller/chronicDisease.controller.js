import {
  chronicDiseaseSchema,
  chronicDiseaseUpdateSchema,
} from "../../utils/validators.js";
import { findChronicDiseaseById } from "../../infrastructure/repositories/patientRepository.js";

import { createChronicDiseaseUseCases } from "../../application/use_cases/chronicDiseaseUseCases.js";

const {
  addChronicDisease,
  getChronicDisease,
  updateChronicDisease,
  removeChronicDisease,
  getPatientChronicDiseases,
} = createChronicDiseaseUseCases();

//CHRONIC DISEASE
export const createChronicDisease = async (req, res) => {
  try {
    // Validate input
    const validatedData = chronicDiseaseSchema.parse(req.body);

    const disease = await addChronicDisease(validatedData);

    return res.status(201).json({
      success: true,
      message: "Архаг өвчний мэдээлэл амжилттай бүртгэгдлээ!",
      data: disease,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getChronicDiseaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const disease = await getChronicDisease(id);

    return res.status(200).json({
      success: true,
      data: disease,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateChronicDiseaseById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate update data
    const validatedData = chronicDiseaseUpdateSchema.parse(req.body);

    const updatedDisease = await updateChronicDisease(id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Архаг өвчний мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedDisease,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteChronicDiseaseById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await removeChronicDisease(id);

    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientChronicDiseaseList = async (req, res) => {
  try {
    const { patientId } = req.params;
    const diseases = await getPatientChronicDiseases(patientId);

    return res.status(200).json({
      success: true,
      count: diseases.length,
      data: diseases,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

// Patient-specific controllers for managing their own chronic diseases

export const getMyChronicDiseases = async (req, res) => {
  try {
    const patientId = req.user.id; // Get patient ID from the authenticated user
    const diseases = await getPatientChronicDiseases(patientId);

    return res.status(200).json({
      success: true,
      count: diseases.length,
      data: diseases,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const createMyChronicDisease = async (req, res) => {
  try {
    const patientId = req.user.id; // Get patient ID from the authenticated user

    // Add patient ID to the request body
    const diseaseData = {
      ...req.body,
      patient: patientId,
    };

    // Validate input
    const validatedData = chronicDiseaseSchema.parse(diseaseData);

    const disease = await addChronicDisease(validatedData);

    return res.status(201).json({
      success: true,
      message: "Архаг өвчний мэдээлэл амжилттай бүртгэгдлээ!",
      data: disease,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateMyChronicDiseaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = req.user.id; // Get patient ID from the authenticated user

    // Check if the disease belongs to the patient
    const disease = await findChronicDiseaseById(id);
    if (!disease) {
      throw createError("Архаг өвчний мэдээлэл олдсонгүй!", 404);
    }

    // Verify ownership
    if (disease.patient.toString() !== patientId) {
      throw createError("Энэ архаг өвчний мэдээлэлд хандах эрхгүй байна!", 403);
    }

    // Validate update data
    const validatedData = chronicDiseaseUpdateSchema.parse(req.body);

    const updatedDisease = await updateChronicDisease(id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Архаг өвчний мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedDisease,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteMyChronicDiseaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = req.user.id; // Get patient ID from the authenticated user

    // Check if the disease belongs to the patient
    const disease = await findChronicDiseaseById(id);
    if (!disease) {
      throw createError("Архаг өвчний мэдээлэл олдсонгүй!", 404);
    }

    // Verify ownership
    if (disease.patient.toString() !== patientId) {
      throw createError("Энэ архаг өвчний мэдээлэлд хандах эрхгүй байна!", 403);
    }

    await removeChronicDisease(id);

    return res.status(200).json({
      success: true,
      message: "Архаг өвчний мэдээлэл амжилттай устгагдлаа!",
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
