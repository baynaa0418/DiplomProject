import {
  createChronicDisease,
  findChronicDiseaseById,
  updateChronicDiseaseById,
  deleteChronicDiseaseById,
  listPatientChronicDiseases,
} from "../../infrastructure/repositories/patientRepository.js";

export const createChronicDiseaseUseCases = () => {
  const addChronicDisease = async (diseaseData) => {
    const disease = await createChronicDisease(diseaseData);
    return disease;
  };

  const getChronicDisease = async (id) => {
    const disease = await findChronicDiseaseById(id);
    if (!disease) {
      throw createError("Архаг өвчний мэдээлэл олдсонгүй!", 404);
    }
    return disease;
  };

  const updateChronicDisease = async (id, updateData) => {
    const disease = await findChronicDiseaseById(id);
    if (!disease) {
      throw createError("Архаг өвчний мэдээлэл олдсонгүй!", 404);
    }

    const updatedDisease = await updateChronicDiseaseById(id, updateData);
    return updatedDisease;
  };

  const removeChronicDisease = async (id) => {
    const disease = await findChronicDiseaseById(id);
    if (!disease) {
      throw createError("Архаг өвчний мэдээлэл олдсонгүй!", 404);
    }

    await deleteChronicDiseaseById(id);
    return {
      success: true,
      message: "Архаг өвчний мэдээлэл амжилттай устгагдлаа!",
    };
  };

  const getPatientChronicDiseases = async (patientId) => {
    const diseases = await listPatientChronicDiseases(patientId);
    return diseases;
  };

  return {
    addChronicDisease,
    getChronicDisease,
    updateChronicDisease,
    removeChronicDisease,
    getPatientChronicDiseases,
  };
};
