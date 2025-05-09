import {
  createQuestionnaire,
  findQuestionnaireById,
  updateQuestionnaireById,
  deleteQuestionnaireById,
  listPatientQuestionnaires,
  listExaminationQuestionnaires,
  listMedicalStaffQuestionnaires,
  listQuestionnaires,
} from "../../infrastructure/repositories/questionnaireRepository.js";
import { createError } from "../../utils/error.js";

//QUESTION
export const createQuestionnaireUseCases = () => {
  const addQuestionnaire = async (questionData) => {
    // Generate unique question_id
    const questionId = Date.now();

    const questionnaire = await createQuestionnaire({
      ...questionData,
      question_id: questionId,
    });

    return questionnaire;
  };

  const getQuestionnaire = async (id) => {
    const questionnaire = await findQuestionnaireById(id);
    if (!questionnaire) {
      throw createError("Асуумжийн мэдээлэл олдсонгүй!", 404);
    }
    return questionnaire;
  };

  const updateQuestionnaire = async (id, updateData) => {
    const questionnaire = await findQuestionnaireById(id);
    if (!questionnaire) {
      throw createError("Асуумжийн мэдээлэл олдсонгүй!", 404);
    }

    // Check if staff can update this questionnaire
    if (
      updateData.staffId &&
      questionnaire.medicalStaff.id.toString() !== updateData.staffId
    ) {
      throw createError(
        "Зөвхөн өөрийн үүсгэсэн асуумжийг засах боломжтой!",
        403
      );
    }

    // Remove staffId from update data as it's not a field in the model
    if (updateData.staffId) {
      delete updateData.staffId;
    }

    const updatedQuestionnaire = await updateQuestionnaireById(id, updateData);
    return updatedQuestionnaire;
  };

  const removeQuestionnaire = async (id, staffId) => {
    const questionnaire = await findQuestionnaireById(id);
    if (!questionnaire) {
      throw createError("Асуумжийн мэдээлэл олдсонгүй!", 404);
    }

    // Check if staff can delete this questionnaire
    if (staffId && questionnaire.medicalStaff.id.toString() !== staffId) {
      throw createError(
        "Зөвхөн өөрийн үүсгэсэн асуумжийг устгах боломжтой!",
        403
      );
    }

    await deleteQuestionnaireById(id);
    return {
      success: true,
      message: "Асуумжийн мэдээлэл амжилттай устгагдлаа!",
    };
  };

  const getPatientQuestionnaires = async (patientId) => {
    const questionnaires = await listPatientQuestionnaires(patientId);
    return questionnaires;
  };

  const getExaminationQuestionnaires = async (examinationId) => {
    const questionnaires = await listExaminationQuestionnaires(examinationId);
    return questionnaires;
  };

  const getMedicalStaffQuestionnaires = async (staffId) => {
    const questionnaires = await listMedicalStaffQuestionnaires(staffId);
    return questionnaires;
  };

  const getAllQuestionnaires = async (filters) => {
    const questionnaires = await listQuestionnaires(filters);
    return questionnaires;
  };

  return {
    addQuestionnaire,
    getQuestionnaire,
    updateQuestionnaire,
    removeQuestionnaire,
    getPatientQuestionnaires,
    getExaminationQuestionnaires,
    getMedicalStaffQuestionnaires,
    getAllQuestionnaires,
  };
};
