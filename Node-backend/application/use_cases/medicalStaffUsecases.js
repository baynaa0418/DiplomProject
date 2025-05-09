import {
  listAllDiseaseCodes,
  findDiseaseCodeById,
  findDiseaseCodeByValue,
  createDiagnosis,
  findDiagnosisById,
  updateDiagnosisById,
  deleteDiagnosisById,
  listPatientDiagnoses,
  listExaminationDiagnoses,
  listMedicalStaffDiagnoses,
  createPrescription,
  findPrescriptionById,
  updatePrescriptionById,
  deletePrescriptionById,
  listPatientPrescriptions,
  listMedicalStaffPrescriptions,
  createPrescribedMed,
  findPrescribedMedById,
  updatePrescribedMedById,
  deletePrescribedMedById,
  listPrescriptionMeds,
  listPatientPrescribedMeds,
  listMedicalStaffPrescribedMeds,
  createPrescribedGuide,
  findPrescribedGuideById,
  updatePrescribedGuideById,
  deletePrescribedGuideById,
  listPrescriptionGuides,
  listPatientPrescribedGuides,
  listMedicalStaffPrescribedGuides,
} from "../../infrastructure/repositories/medicalStaffRepository.js";
import { createError } from "../../utils/error.js";

//UZLEG

//DISEASES
export const createDiseaseCodeUseCases = () => {
  const listDiseaseCodes = async (filters = {}) => {
    const diseaseCodes = await listAllDiseaseCodes(filters);
    return diseaseCodes;
  };

  const getDiseaseCodeById = async (id) => {
    const diseaseCode = await findDiseaseCodeById(id);
    if (!diseaseCode) {
      throw createError("Өвчний код олдсонгүй!", 404);
    }
    return diseaseCode;
  };

  const getDiseaseCodeByValue = async (value) => {
    const diseaseCode = await findDiseaseCodeByValue(value);
    if (!diseaseCode) {
      throw createError("Өвчний код олдсонгүй!", 404);
    }
    return diseaseCode;
  };

  return {
    listDiseaseCodes,
    getDiseaseCodeById,
    getDiseaseCodeByValue,
  };
};

//DIAGNOSIS
export const createDiagnosisUseCases = () => {
  const addDiagnosis = async (diagnosisData) => {
    const diagnosis = await createDiagnosis(diagnosisData);
    return diagnosis;
  };

  const getDiagnosis = async (id) => {
    const diagnosis = await findDiagnosisById(id);
    if (!diagnosis) {
      throw createError("Оношийн мэдээлэл олдсонгүй!", 404);
    }
    return diagnosis;
  };

  const updateDiagnosis = async (id, updateData) => {
    const diagnosis = await findDiagnosisById(id);
    if (!diagnosis) {
      throw createError("Оношийн мэдээлэл олдсонгүй!", 404);
    }

    // Check if staff can update this diagnosis
    if (
      updateData.staffId &&
      diagnosis.medicalStaff._id.toString() !== updateData.staffId
    ) {
      throw createError(
        "Зөвхөн өөрийн бүртгэсэн оношийг засах боломжтой!",
        403
      );
    }

    // Remove staffId from update data as it's not a field in the model
    if (updateData.staffId) {
      delete updateData.staffId;
    }

    const updatedDiagnosis = await updateDiagnosisById(id, updateData);
    return updatedDiagnosis;
  };

  const removeDiagnosis = async (id, staffId) => {
    const diagnosis = await findDiagnosisById(id);
    if (!diagnosis) {
      throw createError("Оношийн мэдээлэл олдсонгүй!", 404);
    }

    // Ensure staff can only delete their own diagnoses
    if (diagnosis.medicalStaff._id.toString() !== staffId) {
      throw createError(
        "Зөвхөн өөрийн бүртгэсэн оношийг устгах боломжтой!",
        403
      );
    }

    await deleteDiagnosisById(id);
    return { success: true, message: "Оношийн мэдээлэл амжилттай устгагдлаа!" };
  };

  const getPatientDiagnoses = async (patientId, filters = {}) => {
    const diagnoses = await listPatientDiagnoses(patientId, filters);
    return diagnoses;
  };

  const getExaminationDiagnoses = async (examinationId) => {
    const diagnoses = await listExaminationDiagnoses(examinationId);
    return diagnoses;
  };

  const getMedicalStaffDiagnoses = async (staffId, filters = {}) => {
    const diagnoses = await listMedicalStaffDiagnoses(staffId, filters);
    return diagnoses;
  };

  return {
    addDiagnosis,
    getDiagnosis,
    updateDiagnosis,
    removeDiagnosis,
    getPatientDiagnoses,
    getExaminationDiagnoses,
    getMedicalStaffDiagnoses,
  };
};

//PRESCRIPTION
export const createPrescriptionUseCases = () => {
  const addPrescription = async (prescriptionData) => {
    const prescription = await createPrescription({
      ...prescriptionData,
      date: prescriptionData.date || new Date(),
    });

    return prescription;
  };

  const getPrescription = async (id) => {
    const prescription = await findPrescriptionById(id);
    if (!prescription) {
      throw createError("Жорын мэдээлэл олдсонгүй!", 404);
    }
    return prescription;
  };

  const updatePrescription = async (id, updateData) => {
    const prescription = await findPrescriptionById(id);
    if (!prescription) {
      throw createError("Жорын мэдээлэл олдсонгүй!", 404);
    }

    // Check if staff can update this prescription
    if (
      updateData.staffId &&
      prescription.prescribedBy._id.toString() !== updateData.staffId
    ) {
      throw createError("Зөвхөн өөрийн бичсэн жорыг засах боломжтой!", 403);
    }

    // Remove staffId from update data as it's not a field in the model
    if (updateData.staffId) {
      delete updateData.staffId;
    }

    const updatedPrescription = await updatePrescriptionById(id, updateData);
    return updatedPrescription;
  };

  const removePrescription = async (id, staffId) => {
    const prescription = await findPrescriptionById(id);
    if (!prescription) {
      throw createError("Жорын мэдээлэл олдсонгүй!", 404);
    }

    // Ensure staff can only delete their own prescriptions
    if (prescription.prescribedBy._id.toString() !== staffId) {
      throw createError("Зөвхөн өөрийн бичсэн жорыг устгах боломжтой!", 403);
    }

    await deletePrescriptionById(id);
    return { success: true, message: "Жорын мэдээлэл амжилттай устгагдлаа!" };
  };

  const getPatientPrescriptions = async (patientId) => {
    const prescriptions = await listPatientPrescriptions(patientId);
    return prescriptions;
  };

  const getMedicalStaffPrescriptions = async (staffId) => {
    const prescriptions = await listMedicalStaffPrescriptions(staffId);
    return prescriptions;
  };

  return {
    addPrescription,
    getPrescription,
    updatePrescription,
    removePrescription,
    getPatientPrescriptions,
    getMedicalStaffPrescriptions,
  };
};

// PRESCRIBED MEDICINE
export const createPrescribedMedUseCases = () => {
  const addPrescribedMed = async (prescribedMedData) => {
    const prescribedMed = await createPrescribedMed(prescribedMedData);
    return prescribedMed;
  };

  const getPrescribedMed = async (id) => {
    const prescribedMed = await findPrescribedMedById(id);
    if (!prescribedMed) {
      throw createError("Эмийн жорын мэдээлэл олдсонгүй!", 404);
    }
    return prescribedMed;
  };

  const updatePrescribedMed = async (id, updateData) => {
    const prescribedMed = await findPrescribedMedById(id);
    if (!prescribedMed) {
      throw createError("Эмийн жорын мэдээлэл олдсонгүй!", 404);
    }

    // Check if staff can update this prescribed med
    if (
      updateData.staffId &&
      prescribedMed.medicalStaff._id.toString() !== updateData.staffId
    ) {
      throw createError(
        "Зөвхөн өөрийн бичсэн эмийн жорыг засах боломжтой!",
        403
      );
    }

    // Remove staffId from update data as it's not a field in the model
    if (updateData.staffId) {
      delete updateData.staffId;
    }

    const updatedPrescribedMed = await updatePrescribedMedById(id, updateData);
    return updatedPrescribedMed;
  };

  const removePrescribedMed = async (id, staffId) => {
    const prescribedMed = await findPrescribedMedById(id);
    if (!prescribedMed) {
      throw createError("Эмийн жорын мэдээлэл олдсонгүй!", 404);
    }

    // Ensure staff can only delete their own prescribed meds
    if (prescribedMed.medicalStaff._id.toString() !== staffId) {
      throw createError(
        "Зөвхөн өөрийн бичсэн эмийн жорыг устгах боломжтой!",
        403
      );
    }

    await deletePrescribedMedById(id);
    return {
      success: true,
      message: "Эмийн жорын мэдээлэл амжилттай устгагдлаа!",
    };
  };

  const getPrescriptionMeds = async (prescriptionId) => {
    const prescribedMeds = await listPrescriptionMeds(prescriptionId);
    return prescribedMeds;
  };

  const getPatientPrescribedMeds = async (patientId) => {
    const prescribedMeds = await listPatientPrescribedMeds(patientId);
    return prescribedMeds;
  };

  const getMedicalStaffPrescribedMeds = async (staffId) => {
    const prescribedMeds = await listMedicalStaffPrescribedMeds(staffId);
    return prescribedMeds;
  };

  return {
    addPrescribedMed,
    getPrescribedMed,
    updatePrescribedMed,
    removePrescribedMed,
    getPrescriptionMeds,
    getPatientPrescribedMeds,
    getMedicalStaffPrescribedMeds,
  };
};

// PrescribedGuide Use Cases
export const createPrescribedGuideUseCases = () => {
  const addPrescribedGuide = async (prescribedGuideData) => {
    const prescribedGuide = await createPrescribedGuide(prescribedGuideData);
    return prescribedGuide;
  };

  const getPrescribedGuide = async (id) => {
    const prescribedGuide = await findPrescribedGuideById(id);
    if (!prescribedGuide) {
      throw createError("Зөвлөмжийн мэдээлэл олдсонгүй!", 404);
    }
    return prescribedGuide;
  };

  const updatePrescribedGuide = async (id, updateData) => {
    const prescribedGuide = await findPrescribedGuideById(id);
    if (!prescribedGuide) {
      throw createError("Зөвлөмжийн мэдээлэл олдсонгүй!", 404);
    }

    // Check if staff can update this prescribed guide
    if (
      updateData.staffId &&
      prescribedGuide.medicalStaff._id.toString() !== updateData.staffId
    ) {
      throw createError(
        "Зөвхөн өөрийн бичсэн зөвлөмжийг засах боломжтой!",
        403
      );
    }

    // Remove staffId from update data as it's not a field in the model
    if (updateData.staffId) {
      delete updateData.staffId;
    }

    const updatedPrescribedGuide = await updatePrescribedGuideById(
      id,
      updateData
    );
    return updatedPrescribedGuide;
  };

  const removePrescribedGuide = async (id, staffId) => {
    const prescribedGuide = await findPrescribedGuideById(id);
    if (!prescribedGuide) {
      throw createError("Зөвлөмжийн мэдээлэл олдсонгүй!", 404);
    }

    // Ensure staff can only delete their own prescribed guides
    if (prescribedGuide.medicalStaff._id.toString() !== staffId) {
      throw createError(
        "Зөвхөн өөрийн бичсэн зөвлөмжийг устгах боломжтой!",
        403
      );
    }

    await deletePrescribedGuideById(id);
    return {
      success: true,
      message: "Зөвлөмжийн мэдээлэл амжилттай устгагдлаа!",
    };
  };

  const getPrescriptionGuides = async (prescriptionId) => {
    const prescribedGuides = await listPrescriptionGuides(prescriptionId);
    return prescribedGuides;
  };

  const getPatientPrescribedGuides = async (patientId) => {
    const prescribedGuides = await listPatientPrescribedGuides(patientId);
    return prescribedGuides;
  };

  const getMedicalStaffPrescribedGuides = async (staffId) => {
    const prescribedGuides = await listMedicalStaffPrescribedGuides(staffId);
    return prescribedGuides;
  };

  return {
    addPrescribedGuide,
    getPrescribedGuide,
    updatePrescribedGuide,
    removePrescribedGuide,
    getPrescriptionGuides,
    getPatientPrescribedGuides,
    getMedicalStaffPrescribedGuides,
  };
};
