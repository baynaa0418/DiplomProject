import mongoose from "mongoose";
const { Schema } = mongoose;

const PrescribedMedSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  dose: { type: String, required: true },
  frequency: { type: String, required: true },
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff", required: true },
  prescription: { type: Schema.Types.ObjectId, ref: "Prescription", required: true }
}, { timestamps: true });

export default mongoose.model("PrescribedMed", PrescribedMedSchema);