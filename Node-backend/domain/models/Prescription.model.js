import mongoose from "mongoose";
const { Schema } = mongoose;

// Эмийн мэдээллийн дэд схем
const MedicineSchema = new Schema({
  name: { type: String, required: true },      // Эмийн нэр
  dosage: { type: String },                    // Тун
  instructions: { type: String },              // Хэрэглэх заавар
}, { _id: false });

const PrescriptionSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    prescribedBy: {
      type: Schema.Types.ObjectId,
      ref: "MedicalStaff",
      required: true,
    },
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    examination_id: { type: Schema.Types.ObjectId, ref: "Examination" },
    medicines: [MedicineSchema],               // Эмийн жагсаалт
    notes: { type: String },                   // Нэмэлт тэмдэглэл
  },
  { timestamps: true }
);

export default mongoose.model("Prescription", PrescriptionSchema);
