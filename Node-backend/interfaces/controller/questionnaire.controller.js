import { createQuestionnaireUseCases } from "../../application/use_cases/questionnaireUseCases.js";
import { questionnaireSchema } from "../../utils/validators.js";

//QUESTION

const {
  addQuestionnaire,
  getQuestionnaire,
  updateQuestionnaire,
  removeQuestionnaire,
  getPatientQuestionnaires,
  getExaminationQuestionnaires,
  getMedicalStaffQuestionnaires,
  getAllQuestionnaires,
} = createQuestionnaireUseCases();

// For medical staff to create questionnaires
export const createQuestionnaire = async (req, res) => {
  try {
    const questionnaireData = {
      ...req.body,
      medicalStaff_id: req.user.id,
    };

    // Validate input
    const validatedData = questionnaireSchema.parse(questionnaireData);

    const questionnaire = await addQuestionnaire(validatedData);

    return res.status(201).json({
      success: true,
      message: "Асуумжийн мэдээлэл амжилттай бүртгэгдлээ!",
      data: questionnaire,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getQuestionnaires = async (req, res) => {
  try {
    const filters = req.query;
    const questionnaires = await getAllQuestionnaires(filters);

    return res.status(200).json({
      success: true,
      count: questionnaires.length,
      data: questionnaires,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getQuestionnaireById = async (req, res) => {
  try {
    const { id } = req.params;
    const questionnaire = await getQuestionnaire(id);

    return res.status(200).json({
      success: true,
      data: questionnaire,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateQuestionnaireById = async (req, res) => {
  try {
    const { id } = req.params;

    // Add staff ID for verification that they own this questionnaire
    const updateData = {
      ...req.body,
      staffId: req.user.id,
    };

    // Validate update data
    //const validatedData = questionnaireUpdateSchema.parse(updateData);

    //const updatedQuestionnaire = await updateQuestionnaire(id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Асуумжийн мэдээлэл амжилттай шинэчлэгдлээ!",
      //data: updatedQuestionnaire,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteQuestionnaireById = async (req, res) => {
  try {
    const { id } = req.params;
    const staffId = req.user.id;

    const result = await removeQuestionnaire(id, staffId);

    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientQuestionnaireList = async (req, res) => {
  try {
    const { patientId } = req.params;
    const questionnaires = await getPatientQuestionnaires(patientId);

    return res.status(200).json({
      success: true,
      count: questionnaires.length,
      data: questionnaires,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getExaminationQuestionnaireList = async (req, res) => {
  try {
    const { examinationId } = req.params;
    const questionnaires = await getExaminationQuestionnaires(examinationId);

    return res.status(200).json({
      success: true,
      count: questionnaires.length,
      data: questionnaires,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getMyQuestionnaires = async (req, res) => {
  try {
    const staffId = req.user.id;
    const questionnaires = await getMedicalStaffQuestionnaires(staffId);

    return res.status(200).json({
      success: true,
      count: questionnaires.length,
      data: questionnaires,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

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
