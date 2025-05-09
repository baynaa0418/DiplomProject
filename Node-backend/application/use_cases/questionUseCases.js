import { createQuestion } from "../../infrastructure/repositories/questionRepository.js";
import { createError } from "../../utils/error.js";

//QUESTION
export const createQuestionUseCases = () => {
  const addQuestion = async (questionData) => {
    const questionnaire = await createQuestion(questionData);
    return questionnaire;
  };

  return { addQuestion };
};
