import {
  createVitalSigns,
  findVitalSignsById,
  updateVitalSignsById,
  findVitalSignsById,
  deleteVitalSignsById,
  listPatientVitalSigns,
  getLatestVitalSignsByPatient,
  listVitalSignsByDateRange,
  listMedicalStaffVitalSigns,
} from "../../infrastructure/repositories/medicalStaffRepository.js";
import { createError } from "../../utils/error.js";

export const createVitalSignsUseCases = () => {
  const addVitalSigns = async (vitalSignsData) => {
    // Generate unique vital_signs_id
    const vitalId = Date.now();

    // If date isn't provided, use current date
    if (!vitalSignsData.date) {
      vitalSignsData.date = new Date();
    }

    const vitalSigns = await createVitalSigns({
      ...vitalSignsData,
      vital_signs_id: vitalId,
    });

    return vitalSigns;
  };

  const getVitalSigns = async (id) => {
    const vitalSigns = await findVitalSignsById(id);
    if (!vitalSigns) {
      throw createError("Амин үзүүлэлтийн мэдээлэл олдсонгүй!", 404);
    }
    return vitalSigns;
  };

  const updateVitalSigns = async (id, updateData) => {
    const vitalSigns = await findVitalSignsById(id);
    if (!vitalSigns) {
      throw createError("Амин үзүүлэлтийн мэдээлэл олдсонгүй!", 404);
    }

    // Ensure staff can only update vital signs they recorded
    if (
      updateData.staffId &&
      vitalSigns.medicalStaff._id.toString() !== updateData.staffId
    ) {
      throw createError(
        "Зөвхөн өөрийн бүртгэсэн амин үзүүлэлтийг засах боломжтой!",
        403
      );
    }

    // Remove staffId from update data as it's not a field in the model
    if (updateData.staffId) {
      delete updateData.staffId;
    }

    const updatedVitalSigns = await updateVitalSignsById(id, updateData);
    return updatedVitalSigns;
  };

  const removeVitalSigns = async (id, staffId) => {
    const vitalSigns = await findVitalSignsById(id);
    if (!vitalSigns) {
      throw createError("Амин үзүүлэлтийн мэдээлэл олдсонгүй!", 404);
    }

    // Ensure staff can only delete vital signs they recorded
    if (staffId && vitalSigns.medicalStaff._id.toString() !== staffId) {
      throw createError(
        "Зөвхөн өөрийн бүртгэсэн амин үзүүлэлтийг устгах боломжтой!",
        403
      );
    }

    await deleteVitalSignsById(id);
    return {
      success: true,
      message: "Амин үзүүлэлтийн мэдээлэл амжилттай устгагдлаа!",
    };
  };

  const getPatientVitalSignsHistory = async (patientId, limit = 0) => {
    const vitalSigns = await listPatientVitalSigns(patientId, limit);
    return vitalSigns;
  };

  const getLatestVitalSigns = async (patientId) => {
    const vitalSigns = await getLatestVitalSignsByPatient(patientId);
    if (!vitalSigns) {
      throw createError("Өвчтөний амин үзүүлэлтийн мэдээлэл олдсонгүй!", 404);
    }
    return vitalSigns;
  };

  const getVitalSignsByDateRange = async (patientId, startDate, endDate) => {
    if (!startDate || !endDate) {
      throw createError("Эхлэх ба дуусах огноог заавал оруулна уу!", 400);
    }

    const vitalSigns = await listVitalSignsByDateRange(
      patientId,
      startDate,
      endDate
    );
    return vitalSigns;
  };

  const getMedicalStaffVitalSigns = async (staffId, limit = 0) => {
    const vitalSigns = await listMedicalStaffVitalSigns(staffId, limit);
    return vitalSigns;
  };

  return {
    addVitalSigns,
    getVitalSigns,
    updateVitalSigns,
    removeVitalSigns,
    getPatientVitalSignsHistory,
    getLatestVitalSigns,
    getVitalSignsByDateRange,
    getMedicalStaffVitalSigns,
  };
};
