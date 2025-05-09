// src/app/api/examinationService.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/examination';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Токен нэмэх interceptor
api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const fetchPatientExaminations = async (patientId) => {
  try {
    const response = await api.get(`/patient/exam/${patientId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Үзлэгийн мэдээлэл авахад алдаа гарлаа');
  }
};

export const fetchExaminationDetails = async (examId) => {
  try {
    const response = await api.get(`/exam/${examId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Дэлгэрэнгүй мэдээлэл авахад алдаа гарлаа');
  }
};