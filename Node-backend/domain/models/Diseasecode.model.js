import { Schema, model } from 'mongoose';

const DiseaseCodeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

const DiseaseCode = model('DiseaseCode', DiseaseCodeSchema);
export default DiseaseCode;