import { Schema, model } from 'mongoose';

const VitalSignsSchema = new Schema(
  {
    date:{type:Date},
    concsiousness_status:{type:String},
    heart_rate: { type: Number },
    blood_pressure: { type: String },
    temperature: { type: Number },
    respiration_rate: { type: Number },
    oxygen_saturation: { type: Number },
    height: {type:Number},
    weight: {type:Number},
    // Relationship: a VitalSigns entry belongs to one Patient
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
  },
  { timestamps: true }
);

const VitalSigns = model('VitalSigns', VitalSignsSchema);
export default VitalSigns;
