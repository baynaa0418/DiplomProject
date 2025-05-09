// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend-ийн хаяг
  credentials: true
}));
app.use(express.json());

// MongoDB холболт
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB холбогдлоо'))
  .catch(err => console.error('MongoDB холболтын алдаа:', err));

// Шугам загвар (Model)
const Patient = mongoose.model('Patient', new mongoose.Schema({
  name: String,
  birthDate: String,
  phone: String,
  medicalHistory: Array,
  // бусад талбарууд
}));

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Нэвтрээгүй байна' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Хүчингүй token' });
  }
};

// API endpoint-ууд
app.post('/api/login', async (req, res) => {
  // Энд логин логик (жишээ болгон)
  const { email, password } = req.body;
  
  // Жишээ validation
  if (email === 'patient@ex.com' && password === 'Password123%') {
    const token = jwt.sign(
      { email, role: 'patient' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    
    res.cookie('token', token, { httpOnly: true, secure: false });
    return res.json({ success: true });
  }
  
  res.status(401).json({ error: 'Нууц үг эсвэл имэйл буруу' });
});

app.get('/api/patients/:id', authenticate, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Өвчтөн олдсонгүй' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
});

// Энэ API нь фронтендээс ирсэн PDF үүсгэх хүсэлтийг боловсруулна
app.post('/api/generate-pdf', authenticate, async (req, res) => {
  // PDF үүсгэх логик
  res.setHeader('Content-Type', 'application/pdf');
  res.send(generatedPdfBuffer);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Сервер ${PORT} дээр ажиллаж байна`));