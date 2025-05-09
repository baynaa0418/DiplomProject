import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import AuthRouter from "./interfaces/routes/auth.routes.js";
import PatientRouter from "./interfaces/routes/patient.routes.js";
import HealthRouter from "./interfaces/routes/health.routes.js";
import MedicalStaffRouter from "./interfaces/routes/medicalstaff.routes.js";
import ExaminationRouter from "./interfaces/routes/examination.routes.js";
import QuestionnaireRouter from "./interfaces/routes/questionnaire.routes.js";
import QuestionRouter from "./interfaces/routes/question.routes.js";
import prescriptionRoutes from './routes/prescription.routes.js';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("Missing MONGO_URI! Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", AuthRouter);
app.use("/api/patient", PatientRouter);
app.use("/api", HealthRouter);
app.use("/api/medicalstaff", MedicalStaffRouter);
app.use("/api/examination", ExaminationRouter);
app.use("/api/questionnaire", QuestionnaireRouter);
app.use("/api/question", QuestionRouter);
app.use('/api/prescriptions', prescriptionRoutes);

console.log("working");
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // DiplomFront/Node-backend/src/app.js
// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import examinationRoutes from './routes/examination.routes.js';
// import authRoutes from './routes/auth.routes.js';

// // Тохиргооны хувьсагчид ачаалах
// dotenv.config();

// const app = express();

// // CORS тохиргоо
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true
// }));

// // JSON боловсруулалт
// app.use(express.json());

// // MongoDB холболт
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('МонгоDB холбогдлоо'))
//   .catch(err => console.error('МонгоDB холболтын алдаа:', err));

// // Роутерууд
// app.use('/api/examinations', examinationRoutes);
// app.use('/api/auth', authRoutes);

// // Алдааны боловсруулагч
// app.use((err, req, res, next) => {
//   const status = err.status || 500;
//   const message = err.message || 'Алдаа гарлаа';
//   res.status(status).json({ success: false, message });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Сервер ${PORT} порт дээр ажиллаж байна`);
// });