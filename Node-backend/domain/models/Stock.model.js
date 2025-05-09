import { Schema, model } from 'mongoose';

const StockSchema = new Schema(
  {
    quantity: {types: String},
    medicine: {type:Schema.Types.ObjectId, ref: 'Medicine'},
    treatment: {type:Schema.Types.ObjectId, ref:'Treatment'},
    medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
  },
  { timestamps: true }
);

const Stock = model('Stock', StockSchema);
export default Stock;
