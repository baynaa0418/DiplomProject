import bcrypt from "bcrypt";
import {
  findUserByEmail,
  createAdmin,
  createMedicalStaff,
  createPatient,
} from "../../infrastructure/repositories/authRepository.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { createError } from "../../utils/error.js";

export const createUserUseCases = () => {
  const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  const registerAdmin = async ({
    firstname,
    lastname,
    email,
    password,
    phoneNumber,
  }) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw createError("Имэйл бүртгэгдсэн байна!", 409);
    }

    const hashedPassword = await hashPassword(password);

    const admin = await createAdmin({
      firstname,
      lastname,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    const payload = { id: admin._id, role: admin.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken, admin };
  };

  const login = async ({ email, password }) => {
    const user = await findUserByEmail(email);
    if (!user) {
      throw createError("Нэвтрэх нэр эсвэл нууц үг буруу байна!", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createError("Нэвтрэх нэр эсвэл нууц үг буруу байна!", 401);
    }

    const payload = { id: user._id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken, user };
  };

  const registerDoctor = async ({
    firstname,
    lastname,
    email,
    password,
    phoneNumber,
    specialization,
  }) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw createError("Имэйл бүртгэгдсэн байна!", 409);
    }

    const hashedPassword = await hashPassword(password);

    const staff = await createMedicalStaff({
      firstname,
      lastname,
      email,
      phoneNumber,
      password: hashedPassword,
      specialization,
      position: "Doctor",
    });

    const payload = { id: staff._id, role: staff.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken, staff };
  };

  const registerNurse = async ({
    firstname,
    lastname,
    email,
    password,
    phoneNumber,
    specialization,
  }) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw createError("Имэйл бүртгэгдсэн байна!", 409);
    }

    const hashedPassword = await hashPassword(password);

    const staff = await createMedicalStaff({
      firstname,
      lastname,
      email,
      phoneNumber,
      password: hashedPassword,
      specialization,
      position: "Nurse",
    });

    const payload = { id: staff._id, role: staff.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken, staff };
  };

  const registerPatient = async ({
    firstname,
    lastname,
    email,
    password,
    phoneNumber,
    type,
    register,
    address,
    sisiID,
    occupation,
    education,
    school,
    birthOfDate,
    gender,
  }) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw createError("Имэйл бүртгэгдсэн байна!", 409);
    }

    const hashedPassword = await hashPassword(password);

    const patient = await createPatient({
      firstname,
      lastname,
      email,
      phoneNumber,
      password: hashedPassword,
      type,
      register,
      address,
      sisiID,
      occupation,
      education,
      school,
      birthOfDate,
      gender,
    });

    const payload = { id: patient._id, role: patient.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return { accessToken, refreshToken, patient };
  };

  return {
    registerAdmin,
    registerDoctor,
    registerNurse,
    registerPatient,
    login,
  };
};
