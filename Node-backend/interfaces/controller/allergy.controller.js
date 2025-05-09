import { createAllergyUseCases } from "../../application/use_cases/patientUseCases.js";
import { allergySchema, allergyUpdateSchema } from "../../utils/validators.js";

import { findAllergyById } from "../../infrastructure/repositories/patientRepository.js";
import { createError } from "../../utils/error.js";

const {
  addAllergy,
  getAllergy,
  updateAllergy,
  removeAllergy,
  getPatientAllergies,
} = createAllergyUseCases();

//allergy
export const createAllergy = async (req, res) => {
  try {
    // Validate input
    const validatedData = allergySchema.parse(req.body);

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

export const getAllergyById = async (req, res) => {
  try {
    const { id } = req.params;
    const allergy = await getAllergy(id);

    return res.status(200).json({
      success: true,
      data: allergy,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateAllergyById = async (req, res) => {
  try {
    const { id } = req.params;

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

export const deleteAllergyById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await removeAllergy(id);

    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientAllergyList = async (req, res) => {
  try {
    const { patientId } = req.params;
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
