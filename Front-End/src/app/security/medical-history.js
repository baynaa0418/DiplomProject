import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import MedicalHistory from '@/models/MedicalHistory';
import VitalSigns from '@/models/VitalSigns';

export default async function handler(req, res) {
  // 1. Токен шалгах
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Токен байхгүй эсвэл буруу формат" });
  }

  const token = authHeader.split(" ")[1];
  
  try {
    // 2. Токен баталгаажуулах
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // 3. userId параметр шалгах
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId параметр шаардлагатай" });
    }

    // 4. Эрх шалгах
    if (userId !== decoded.id) {
      return res.status(403).json({ 
        message: "Эрх хүрэлцэхгүй",
        details: `Токен ID: ${decoded.id}, Хүсэлт ID: ${userId}`
      });
    }

    // 5. DB холболт
    await dbConnect().catch(err => {
      console.error("DB холболтын алдаа:", err);
      throw new Error("Database холболт амжилтгүй");
    });

    // 6. Өгөгдөл авах
    const [medicalHistory, vitalSigns] = await Promise.all([
      MedicalHistory.find({ patientId: userId }).sort({ date: -1 }).lean(),
      VitalSigns.find({ patientId: userId }).sort({ date: -1 }).lean()
    ]);

    console.log(`Олдсон өгөгдөл: ${medicalHistory.length} medical, ${vitalSigns.length} vital`);

    // 7. Хариу илгээх
    res.status(200).json({ 
      success: true,
      medicalHistory,
      vitalSigns 
    });

  } catch (error) {
    console.error("API алдаа:", {
      message: error.message,
      stack: error.stack,
      time: new Date().toISOString()
    });

    // Токены алдаануудыг ялгах
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Буруу токен" });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Токен хугацаа дууссан" });
    }

    res.status(500).json({ 
      message: "Серверийн алдаа",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}