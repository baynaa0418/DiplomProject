import mongoose from "mongoose";
const { Schema } = mongoose;

const questionnaireSchema = new Schema(
  {
    patient_id: { type: Schema.Types.ObjectId, ref: "Patient" },
    medicalStaff_id: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
  },
  { timestamps: true }
);

export default mongoose.model("Questionnaire", questionnaireSchema);
