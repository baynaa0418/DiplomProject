import Question from "../../domain/models/Question.model.js";

export const createQuestion = async (questionData) => {
  return await Question.create(questionData);
};
