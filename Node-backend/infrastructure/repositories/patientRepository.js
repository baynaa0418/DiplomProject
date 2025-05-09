import Patient from "../../domain/models/Patient.model.js";
import Allergies from "../../domain/models/Allergy.model.js";
import ChronicDiseases from "../../domain/models/ChronicDiseases.model.js";

export const listAllPatients = async (filters = {}) => {
  return await Patient.find(filters);
};

//allergy
export const createAllergy = async (allergyData) => {
  return await Allergies.create(allergyData);
};

export const findAllergyById = async (id) => {
  return await Allergies.findById(id);
};

export const updateAllergyById = async (id, updateData) => {
  return await Allergies.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};

export const deleteAllergyById = async (id) => {
  return await Allergies.findByIdAndDelete(id);
};

export const listPatientAllergies = async (patientId) => {
  return await Allergies.find({ patient: patientId })
    .sort({ date_of_onset: -1 });
};


//CHRINIC DISEASE
export const createChronicDisease = async (diseaseData) => {
  return await ChronicDiseases.create(diseaseData);
};

export const findChronicDiseaseById = async (id) => {
  return await ChronicDiseases.findById(id);
};

export const updateChronicDiseaseById = async (id, updateData) => {
  return await ChronicDiseases.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};

export const deleteChronicDiseaseById = async (id) => {
  return await ChronicDiseases.findByIdAndDelete(id);
};

export const listPatientChronicDiseases = async (patientId) => {
  return await ChronicDiseases.find({ patient: patientId })
    .sort({ diagnosisDate: -1 });
};