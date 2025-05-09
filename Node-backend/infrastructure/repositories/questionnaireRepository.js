import Questionnaire from "../../domain/models/Questionnaire.model.js";

export const createQuestionnaire = async (questionData) => {
  return await Questionnaire.create(questionData);
};

export const findQuestionnaireById = async (id) => {
  return await Questionnaire.findById(id)
    .populate("patient", "firstname lastname register")
    .populate("examination", "exam_id exam_date")
    .populate("medicalStaff", "firstname lastname position");
};

export const updateQuestionnaireById = async (id, updateData) => {
  return await Questionnaire.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("patient", "firstname lastname register")
    .populate("examination", "exam_id exam_date")
    .populate("medicalStaff", "firstname lastname position");
};

export const deleteQuestionnaireById = async (id) => {
  return await Questionnaire.findByIdAndDelete(id);
};

export const listPatientQuestionnaires = async (patientId) => {
  return await Questionnaire.find({ patient: patientId })
    .populate("examination", "exam_id exam_date")
    .populate("medicalStaff", "firstname lastname position");
};

export const listExaminationQuestionnaires = async (examinationId) => {
  return await Questionnaire.find({ examination: examinationId })
    .populate("patient", "firstname lastname register")
    .populate("medicalStaff", "firstname lastname position");
};

export const listMedicalStaffQuestionnaires = async (staffId) => {
  return await Questionnaire.find({ medicalStaff: staffId })
    .populate("patient", "firstname lastname register")
    .populate("examination", "exam_id exam_date");
};

export const listQuestionnaires = async (filters) => {
  const { patient_id, medicalStaff_id } = filters;

  const filter = {};

  if (patient_id) filter.patient_id = patient_id;
  if (medicalStaff_id) filter.medicalStaff_id = medicalStaff_id;

  const questionnaires = await Questionnaire.find(filter)
    .populate("patient_id", "firstname lastname register")
    .populate("medicalStaff_id", "firstname lastname position");
  return questionnaires;
};

export const getQuestionnairesByField = async (field, value) => {
  const query = { [field]: value };

  const baseQuery = Questionnaire.find(query);

  // Add populate based on the field
  if (field === "patient") {
    baseQuery
      .populate("examination", "exam_id exam_date")
      .populate("medicalStaff", "firstname lastname position");
  } else if (field === "examination") {
    baseQuery
      .populate("patient", "firstname lastname register")
      .populate("medicalStaff", "firstname lastname position");
  } else if (field === "medicalStaff") {
    baseQuery
      .populate("patient", "firstname lastname register")
      .populate("examination", "exam_id exam_date");
  }

  return await baseQuery.exec();
};
