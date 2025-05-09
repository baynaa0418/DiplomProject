import mongoose from "mongoose";
const { Schema } = mongoose;

const PrescribedGuideSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    dose: { type: String },
    frequency: { type: String },
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    medicalStaff: {
      type: Schema.Types.ObjectId,
      ref: "MedicalStaff",
      required: true,
    },
    prescription: {
      type: Schema.Types.ObjectId,
      ref: "Prescription",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PrescribedGuide", PrescribedGuideSchema);
