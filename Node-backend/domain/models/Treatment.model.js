import { Schema, model } from "mongoose";

const TreatmentSchema = new Schema(
  {
    date: { type: Date },
    treatmentType: {
      type: String,
      enum: ["Uvch", "Bumba", "Sharlaga", "Dusal", "Taria"],
    },
    diagnosisType: { type: String, enum: ["in", "out"] },
    totalQuantity: { type: Number },
    sessionsCompleted: { type: Number },
    examination_id: { type: Schema.Types.ObjectId, ref: "Examination" },
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
    medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
  },
  { timestamps: true }
);

const Treatment = model("Treatment", TreatmentSchema);
export default Treatment;
