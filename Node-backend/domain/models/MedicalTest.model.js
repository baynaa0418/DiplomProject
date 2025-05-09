import { Schema } from "mongoose";

const medicalTestSchema = new Schema({
  testType: { type: String, enum: ["blood", "urine"] },
  dateOfTest: { type: Date },
  Result: { type: String },
  ResultStatus: {
    type: String,
    enum: ["pending", "completed", "abnormal", "normal"],
  },
  note: { type: String },
  examination_id: { type: Schema.Types.ObjectId, ref: "Examination" },
  patients: { type: Schema.Types.ObjectId, ref: "Patient" },
});

//Mongoose's discriminator feature allows you to create specialized models that inherit from a base model.
const MedicalTest = User.discriminator("MedicalTest", medicalTestSchema);

export default MedicalTest;
