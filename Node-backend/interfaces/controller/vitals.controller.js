import { createVitalSignsUseCases } from "../../application/use_cases/vitalSignsUseCases";

//VITAL SIGNS
const {
  addVitalSigns,
  getVitalSigns,
  updateVitalSigns,
  removeVitalSigns,
  getPatientVitalSignsHistory,
  getLatestVitalSigns,
  getVitalSignsByDateRange,
  getMedicalStaffVitalSigns,
} = createVitalSignsUseCases();

export const createVitalSigns = async (req, res) => {
  try {
    // Add the medical staff ID from authenticated user
    const vitalSignsData = {
      ...req.body,
      medicalStaff: req.user.id,
    };

    // Parse date if it's a string
    if (vitalSignsData.date && typeof vitalSignsData.date === "string") {
      vitalSignsData.date = new Date(vitalSignsData.date);
    }

    // Validate input
    const validatedData = vitalSignsSchema.parse(vitalSignsData);

    const vitalSigns = await addVitalSigns(validatedData);

    return res.status(201).json({
      success: true,
      message: "Амин үзүүлэлтийн мэдээлэл амжилттай бүртгэгдлээ!",
      data: vitalSigns,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getVitalSignsById = async (req, res) => {
  try {
    const { id } = req.params;
    const vitalSigns = await getVitalSigns(id);

    return res.status(200).json({
      success: true,
      data: vitalSigns,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateVitalSignsById = async (req, res) => {
  try {
    const { id } = req.params;

    // Add staff ID for verification that they recorded these vital signs
    const updateData = {
      ...req.body,
      staffId: req.user.id,
    };

    // Parse date if it's a string
    if (updateData.date && typeof updateData.date === "string") {
      updateData.date = new Date(updateData.date);
    }

    // Validate update data
    const validatedData = vitalSignsUpdateSchema.parse(updateData);

    const updatedVitalSigns = await updateVitalSigns(id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Амин үзүүлэлтийн мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedVitalSigns,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteVitalSignsById = async (req, res) => {
  try {
    const { id } = req.params;
    const staffId = req.user.id;

    const result = await removeVitalSigns(id, staffId);

    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientVitalSignsList = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { limit } = req.query;

    const vitalSigns = await getPatientVitalSignsHistory(
      patientId,
      parseInt(limit) || 0
    );

    return res.status(200).json({
      success: true,
      count: vitalSigns.length,
      data: vitalSigns,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientLatestVitalSigns = async (req, res) => {
  try {
    const { patientId } = req.params;
    const vitalSigns = await getLatestVitalSigns(patientId);

    return res.status(200).json({
      success: true,
      data: vitalSigns,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientVitalSignsByDateRange = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { startDate, endDate } = req.query;

    // Validate date range
    const validatedDates = dateRangeSchema.parse({ startDate, endDate });

    const vitalSigns = await getVitalSignsByDateRange(
      patientId,
      validatedDates.startDate,
      validatedDates.endDate
    );

    return res.status(200).json({
      success: true,
      count: vitalSigns.length,
      data: vitalSigns,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getMyVitalSigns = async (req, res) => {
  try {
    const patientId = req.user.id;
    const vitalSigns = await getPatientVitalSignsHistory(patientId);

    return res.status(200).json({
      success: true,
      count: vitalSigns.length,
      data: vitalSigns,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getMyLatestVitalSigns = async (req, res) => {
  try {
    const patientId = req.user.id;
    const vitalSigns = await getLatestVitalSigns(patientId);

    return res.status(200).json({
      success: true,
      data: vitalSigns,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getMyVitalSignsByStaff = async (req, res) => {
  try {
    const staffId = req.user.id;
    const { limit } = req.query;

    const vitalSigns = await getMedicalStaffVitalSigns(
      staffId,
      parseInt(limit) || 0
    );

    return res.status(200).json({
      success: true,
      count: vitalSigns.length,
      data: vitalSigns,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};
