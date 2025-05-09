import mongoose from "mongoose";
import QuestionnaireModel from "./Questionnaire.model.js";
const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    question: { type: String },
    answer: { type: String },
    questionnaire_id: { type: Schema.Types.ObjectId, ref: "Questionnaire" },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
