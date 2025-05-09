import mongoose from "mongoose";
const { Schema } = mongoose;

const chronicDiseasesSchema = new Schema({
  name:          { type: String },
  description:   { type: String },
  diagnosisDate: { type: Date },
  patient:       { type: Schema.Types.ObjectId, ref: "Patient" }
});

export default mongoose.model("ChronicDiseases", chronicDiseasesSchema);
