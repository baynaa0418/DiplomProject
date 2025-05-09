// utils/generatePdf.js
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const generateMedicalReport = (userData, medicalHistory, vitalSigns) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(18);
  doc.text("ЭМНЭЛГИЙН ТАЙЛАН", 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text(`Огноо: ${new Date().toLocaleDateString()}`, 14, 30);
  doc.text(`Хэрэглэгч: ${userData.name}`, 14, 38);
  
  // Үндсэн мэдээлэл хүснэгт
  doc.autoTable({
    startY: 50,
    head: [['Талбар', 'Мэдээлэл']],
    body: [
      ['Регистрийн дугаар', userData.regNumber || 'Оруулаагүй'],
      ['Имэйл', userData.email],
      ['Утасны дугаар', userData.phone || 'Оруулаагүй']
    ],
    theme: 'grid'
  });
  
  // Эмнэлгийн түүх
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Огноо', 'Онош', 'Эмч', 'Эмчилгээ']],
    body: medicalHistory.map(item => [
      item.date,
      item.diagnosis,
      item.doctor,
      item.treatment
    ]),
    theme: 'grid'
  });
  
  // Амин үзүүлэлт
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Огноо', 'Цусны даралт', 'Зүрхний цохилт', 'Биеийн хэм']],
    body: vitalSigns.map(item => [
      item.date,
      item.bloodPressure,
      item.heartRate,
      item.temperature
    ]),
    theme: 'grid'
  });
  
  // Footer
  doc.setFontSize(10);
  doc.text("Энэхүү тайлан нь МУИС-ийн эмнэлгийн системээс автоматаар үүсгэгдсэн.", 105, doc.internal.pageSize.height - 10, { align: 'center' });
  
  return doc;
};