import { Schema, model } from 'mongoose';

const MedicalHistorySchema = new Schema(
  {
    historyDate: {type:Date},
    diagnosis: {type: Schema.Types.ObjectId, ref: 'Diagnosis'},
    treatment: {type: Schema.Types.ObjectId, ref:'Treatment'},
    prescription: {type:Schema.Types.ObjectId, ref:'Prescription'},
    medicalStaff: {type:Schema.Types.ObjectId, ref:'MedicalStaff'},
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  },
  { timestamps: true }
);

const MedicalHistory = model('MedicalHistory', MedicalHistorySchema);
export default MedicalHistory;
