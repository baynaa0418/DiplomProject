import { Schema, model } from 'mongoose';

const DiagnosisSchema = new Schema(
  {
    diagnosisCode: { type: Schema.Types.ObjectId, ref: "DiseaseCode"},
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    examination:   { type: Schema.Types.ObjectId, ref: "Examination" },
    medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
  },
  { timestamps: true }
);

const Diagnosis = model('Diagnosis', DiagnosisSchema);
export default Diagnosis;
