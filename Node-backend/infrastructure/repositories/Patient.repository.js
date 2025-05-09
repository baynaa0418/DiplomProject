import Patient from '../models/Patient.model.js';
import MedicalRecord from '../models/MedicalRecord.model.js';

export class PatientRepository {
  async findById(patientId) {
    return Patient.findById(patientId).select('-password');
  }

  async updateById(patientId, updateData) {
    return Patient.findByIdAndUpdate(patientId, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');
  }

  async findMedicalRecords(patientId) {
    return MedicalRecord.find({ patient: patientId })
      .populate('examinations')
      .populate('treatments')
      .populate('vitalSigns');
  }

  async createPatient(patientData) {
    const patient = new Patient(patientData);
    return patient.save();
  }
}