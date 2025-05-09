import bcrypt from "bcrypt";
import { listAllPatients } from "../../infrastructure/repositories/patientRepository.js";
import { createError } from "../../utils/error.js";
import {
  createAllergy,
  findAllergyById,
  updateAllergyById,
  deleteAllergyById,
  listPatientAllergies,
} from "../../infrastructure/repositories/patientRepository.js";

// Бүх үйлчлүүлэгч авах use case (public API-д зориулсан)
export const getAllPatients = async () => {
  const patients = await listAllPatients();
  return patients;
};

//buh uwchtun
export const createPatientUseCases = () => {
  const listPatients = async (filters = {}) => {
    const patients = await listAllPatients(filters);
    return patients;
  };

  return {
    listPatients,
  };
};

//ALLERGY
export const createAllergyUseCases = () => {
  const addAllergy = async (allergyData) => {
    // Generate unique allergies_id
    const allergiesId = Date.now();

    const allergy = await createAllergy({
      ...allergyData,
      allergies_id: allergiesId,
    });

    return allergy;
  };

  const getAllergy = async (id) => {
    const allergy = await findAllergyById(id);
    if (!allergy) {
      throw createError("Харшлын мэдээлэл олдсонгүй!", 404);
    }
    return allergy;
  };

  const updateAllergy = async (id, updateData) => {
    const allergy = await findAllergyById(id);
    if (!allergy) {
      throw createError("Харшлын мэдээлэл олдсонгүй!", 404);
    }

    const updatedAllergy = await updateAllergyById(id, updateData);
    return updatedAllergy;
  };

  const removeAllergy = async (id) => {
    const allergy = await findAllergyById(id);
    if (!allergy) {
      throw createError("Харшлын мэдээлэл олдсонгүй!", 404);
    }

    await deleteAllergyById(id);
    return { success: true, message: "Харшлын мэдээлэл амжилттай устгагдлаа!" };
  };

  const getPatientAllergies = async (patientId) => {
    const allergies = await listPatientAllergies(patientId);
    return allergies;
  };

  return {
    addAllergy,
    getAllergy,
    updateAllergy,
    removeAllergy,
    getPatientAllergies,
  };
};