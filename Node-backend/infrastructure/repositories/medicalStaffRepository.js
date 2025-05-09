import DiseaseCode from "../../domain/models/Diseasecode.model.js";
import VitalSigns from "../../domain/models/Vital.model.js";
import Diagnosis from "../../domain/models/Diagnosis.model.js";
import Prescription from "../../domain/models/Prescription.model.js";
import PrescribedMed from "../../domain/models/PrescribedMed.model.js";
import PrescribedGuide from "../../domain/models/PrescribedGuide.model.js";

//DISEASE

export const listAllDiseaseCodes = async (filters = {}) => {
  let query = {};

  // If search term is provided, search in description and value fields
  if (filters.search) {
    query = {
      $or: [
        { description: { $regex: filters.search, $options: "i" } },
        { value: { $regex: filters.search, $options: "i" } },
      ],
    };
  }

  return await DiseaseCode.find(query)
    .sort({ value: 1 }) // Sort by ICD-10 code
    .limit(filters.limit ? parseInt(filters.limit) : 0);
};

export const findDiseaseCodeById = async (id) => {
  return await DiseaseCode.findById(id);
};

export const findDiseaseCodeByValue = async (value) => {
  return await DiseaseCode.findOne({ value });
};

//DIAGNOSIS
export const createDiagnosis = async (diagnosisData) => {
  return await Diagnosis.create(diagnosisData);
};

export const findDiagnosisById = async (id) => {
  return await Diagnosis.findById(id)
    .populate("patient", "firstname lastname register sisiID")
    .populate("medicalStaff", "firstname lastname position specialization")
    .populate("diagnosisCode", "name description value")
    .populate("examination", "exam_id exam_date");
};

export const updateDiagnosisById = async (id, updateData) => {
  return await Diagnosis.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("patient", "firstname lastname register sisiID")
    .populate("medicalStaff", "firstname lastname position specialization")
    .populate("diagnosisCode", "name description value")
    .populate("examination", "exam_id exam_date");
};

export const deleteDiagnosisById = async (id) => {
  return await Diagnosis.findByIdAndDelete(id);
};

export const listPatientDiagnoses = async (patientId, filters = {}) => {
  const query = { patient: patientId, ...filters };

  return await Diagnosis.find(query)
    .populate("medicalStaff", "firstname lastname position specialization")
    .populate("diagnosisCode", "name description value")
    .populate("examination", "exam_id exam_date")
    .sort({ createdAt: -1 }); // Sort by creation date, most recent first
};

export const listExaminationDiagnoses = async (examinationId) => {
  return await Diagnosis.find({ examination: examinationId })
    .populate("patient", "firstname lastname register sisiID")
    .populate("medicalStaff", "firstname lastname position specialization")
    .populate("diagnosisCode", "name description value")
    .sort({ createdAt: -1 });
};

export const listMedicalStaffDiagnoses = async (staffId, filters = {}) => {
  const query = { medicalStaff: staffId, ...filters };

  return await Diagnosis.find(query)
    .populate("patient", "firstname lastname register sisiID")
    .populate("diagnosisCode", "name description value")
    .populate("examination", "exam_id exam_date")
    .sort({ createdAt: -1 }); // Sort by creation date, most recent first
};

//VITAL SIGNS
export const createVitalSigns = async (vitalSignsData) => {
  return await VitalSigns.create(vitalSignsData);
};

export const findVitalSignsById = async (id) => {
  return await VitalSigns.findById(id)
    .populate("patient", "firstname lastname register sisiID")
    .populate("medicalStaff", "firstname lastname position specialization");
};

export const updateVitalSignsById = async (id, updateData) => {
  return await VitalSigns.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("patient", "firstname lastname register sisiID")
    .populate("medicalStaff", "firstname lastname position specialization");
};

export const deleteVitalSignsById = async (id) => {
  return await VitalSigns.findByIdAndDelete(id);
};

export const listPatientVitalSigns = async (patientId, limit = 0) => {
  return await VitalSigns.find({ patient: patientId })
    .populate("medicalStaff", "firstname lastname position specialization")
    .sort({ date: -1, createdAt: -1 })
    .limit(limit);
};

export const getLatestVitalSignsByPatient = async (patientId) => {
  return await VitalSigns.findOne({ patient: patientId })
    .sort({ date: -1, createdAt: -1 })
    .populate("patient", "firstname lastname register sisiID")
    .populate("medicalStaff", "firstname lastname position specialization");
};

export const listVitalSignsByDateRange = async (
  patientId,
  startDate,
  endDate
) => {
  return await VitalSigns.find({
    patient: patientId,
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  })
    .populate("medicalStaff", "firstname lastname position specialization")
    .sort({ date: -1 });
};

export const listMedicalStaffVitalSigns = async (staffId, limit = 0) => {
  return await VitalSigns.find({ medicalStaff: staffId })
    .populate("patient", "firstname lastname register sisiID")
    .sort({ date: -1, createdAt: -1 })
    .limit(limit);
};

//Prescription
export const createPrescription = async (prescriptionData) => {
  return await Prescription.create(prescriptionData);
};

export const findPrescriptionById = async (id) => {
  return await Prescription.findById(id)
    .populate("prescribedBy", "firstname lastname position specialization")
    .populate("patient", "firstname lastname register sisiID");
};

export const updatePrescriptionById = async (id, updateData) => {
  return await Prescription.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("prescribedBy", "firstname lastname position specialization")
    .populate("patient", "firstname lastname register sisiID");
};

export const deletePrescriptionById = async (id) => {
  return await Prescription.findByIdAndDelete(id);
};

export const listPatientPrescriptions = async (patientId) => {
  return await Prescription.find({ patient: patientId })
    .populate("prescribedBy", "firstname lastname position specialization")
    .sort({ date: -1 }); // Sort by date, most recent first
};

export const listMedicalStaffPrescriptions = async (staffId) => {
  return await Prescription.find({ prescribedBy: staffId })
    .populate("patient", "firstname lastname register sisiID")
    .sort({ date: -1 }); // Sort by date, most recent first
};

// PrescribedMed
export const createPrescribedMed = async (prescribedMedData) => {
  return await PrescribedMed.create(prescribedMedData);
};

export const findPrescribedMedById = async (id) => {
  return await PrescribedMed.findById(id)
    .populate("patient", "firstname lastname register sisiID")
    .populate("medicalStaff", "firstname lastname position specialization")
    .populate("prescription");
};

export const updatePrescribedMedById = async (id, updateData) => {
  return await PrescribedMed.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("patient", "firstname lastname register sisiID")
    .populate("medicalStaff", "firstname lastname position specialization")
    .populate("prescription");
};

export const deletePrescribedMedById = async (id) => {
  return await PrescribedMed.findByIdAndDelete(id);
};

export const listPrescriptionMeds = async (prescriptionId) => {
  return await PrescribedMed.find({ prescription: prescriptionId }).populate(
    "medicalStaff",
    "firstname lastname position specialization"
  );
};

export const listPatientPrescribedMeds = async (patientId) => {
  return await PrescribedMed.find({ patient: patientId })
    .populate("medicalStaff", "firstname lastname position specialization")
    .populate("prescription")
    .sort({ "prescription.date": -1 });
};

export const listMedicalStaffPrescribedMeds = async (staffId) => {
  return await PrescribedMed.find({ medicalStaff: staffId })
    .populate("patient", "firstname lastname register sisiID")
    .populate("prescription")
    .sort({ "prescription.date": -1 });
};

// PrescribedGuide
export const createPrescribedGuide = async (prescribedGuideData) => {
  return await PrescribedGuide.create(prescribedGuideData);
};

export const findPrescribedGuideById = async (id) => {
  return await PrescribedGuide.findById(id)
    .populate("patient", "firstname lastname register sisiID")
    .populate("medicalStaff", "firstname lastname position specialization")
    .populate("prescription");
};

export const updatePrescribedGuideById = async (id, updateData) => {
  return await PrescribedGuide.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("patient", "firstname lastname register sisiID")
    .populate("medicalStaff", "firstname lastname position specialization")
    .populate("prescription");
};

export const deletePrescribedGuideById = async (id) => {
  return await PrescribedGuide.findByIdAndDelete(id);
};

export const listPrescriptionGuides = async (prescriptionId) => {
  return await PrescribedGuide.find({ prescription: prescriptionId }).populate(
    "medicalStaff",
    "firstname lastname position specialization"
  );
};

export const listPatientPrescribedGuides = async (patientId) => {
  return await PrescribedGuide.find({ patient: patientId })
    .populate("medicalStaff", "firstname lastname position specialization")
    .populate("prescription")
    .sort({ "prescription.date": -1 });
};

export const listMedicalStaffPrescribedGuides = async (staffId) => {
  return await PrescribedGuide.find({ medicalStaff: staffId })
    .populate("patient", "firstname lastname register sisiID")
    .populate("prescription")
    .sort({ "prescription.date": -1 });
};
