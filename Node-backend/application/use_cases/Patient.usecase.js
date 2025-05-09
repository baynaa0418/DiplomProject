export class PatientUseCase {
    constructor(patientRepository) {
      this.patientRepository = patientRepository;
    }
  
    async getPatientProfile(patientId) {
      try {
        const patient = await this.patientRepository.findById(patientId);
        if (!patient) {
          throw new Error('Patient not found');
        }
        return patient;
      } catch (error) {
        throw new Error(`Failed to get patient profile: ${error.message}`);
      }
    }
  
    async updatePatientProfile(patientId, updateData) {
      try {
        const updatedPatient = await this.patientRepository.updateById(
          patientId,
          updateData
        );
        return updatedPatient;
      } catch (error) {
        throw new Error(`Failed to update patient profile: ${error.message}`);
      }
    }
  
    async getMedicalRecords(patientId) {
      try {
        const records = await this.patientRepository.findMedicalRecords(patientId);
        return records;
      } catch (error) {
        throw new Error(`Failed to get medical records: ${error.message}`);
      }
    }
  }