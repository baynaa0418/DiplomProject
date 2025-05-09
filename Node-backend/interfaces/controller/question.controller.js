import { createQuestionUseCases } from "../../application/use_cases/questionUseCases.js";
import { questionSchema } from "../../utils/validators.js";

const { addQuestion } = createQuestionUseCases();

export const createQuestion = async (req, res) => {
  try {
    const validatedData = questionSchema.parse(req.body);

    const question = await addQuestion(validatedData);

    return res.status(201).json({
      success: true,
      message: "Асуулт амжилттай бүртгэгдлээ!",
      data: question,
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
