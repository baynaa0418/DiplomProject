// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import bodyParser from "body-parser";
// import AuthRouter from "./interfaces/routes/auth.routes.js";
// import PatientRouter from "./interfaces/routes/patient.routes.js";
// import HealthRouter from "./interfaces/routes/health.routes.js";
// import MedicalStaffRouter from "./interfaces/routes/medicalstaff.routes.js";
// import ExaminationRouter from "./interfaces/routes/examination.routes.js";
// import QuestionnaireRouter from "./interfaces/routes/questionnaire.routes.js";
// import QuestionRouter from "./interfaces/routes/question.routes.js";
// import prescriptionRoutes from './routes/prescription.routes.js';

// const app = express();
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 8000;
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//   console.error("Missing MONGO_URI! Check your .env file.");
//   process.exit(1);
// }

// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// app.use("/api/auth", AuthRouter);
// app.use("/api/patient", PatientRouter);
// app.use("/api", HealthRouter);
// app.use("/api/medicalstaff", MedicalStaffRouter);
// app.use("/api/examination", ExaminationRouter);
// app.use("/api/questionnaire", QuestionnaireRouter);
// app.use("/api/question", QuestionRouter);
// app.use('/api/prescriptions', prescriptionRoutes);

// console.log("working");
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





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

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Хэд хэдэн origin-д зориулж тохируулна
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB connection
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MongoDB connection URI is missing! Please check your .env file.");
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => console.log("✅ MongoDB connection established successfully"))
.catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API Routes
app.use("/api/auth", AuthRouter);
app.use("/api/patients", PatientRouter);  // Changed to plural for REST consistency
app.use("/api/health", HealthRouter);
app.use("/api/medical-staff", MedicalStaffRouter);  // Changed to kebab-case
app.use("/api/examinations", ExaminationRouter);    // Changed to plural
app.use("/api/questionnaires", QuestionnaireRouter); // Changed to plural
app.use("/api/questions", QuestionRouter);          // Changed to plural
app.use("/api/prescriptions", prescriptionRoutes);

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.method} ${req.originalUrl}`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Server startup
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Base URL: http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle SIGTERM for graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});