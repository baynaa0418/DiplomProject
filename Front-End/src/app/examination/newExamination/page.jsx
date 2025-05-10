'use client';
import React, { useState, useEffect } from 'react';
import { Box, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { actionOptions, diagnosisOptions } from '../../components/examination/mockdata';
import Header from '../../components/examination/Header';
import PatientInfo from '../../components/examination/PatientInfo';
import PatientAllergies from '../../components/examination/Allergy';
import PatientChronicDiseases from '../../components/examination/ChronicDisease';
import PatientSelection from '../../components/examination/PatientSelection';
import ServiceCategories from '../../components/examination/ServiceCategories';
import VitalSigns from '../../components/examination/VitalSigns';
import DiagnosisTab from '../../components/examination/Diagnosis';
import TreatmentTab from '../../components/examination/Treatment';
import PrescriptionTab from '../../components/examination/Prescription';
import ActionButtons from '../../components/examination/ActionButtons';
import PatientSearchDialog from '../../components/examination/PatientSearchDialog';
import PatientMedicalHistory from '../../components/examination/MedicalHistory';
import AddIcon from '@mui/icons-material/Add';

export default function CreateExaminationPage() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [patientDialogOpen, setPatientDialogOpen] = useState(false);
  const [patientSearch, setPatientSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // Notification state
  const [notification, setNotification] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    date: new Date(),
    type: 'Анхан',
    diagnosis: '',
    diagnosisCode: '',
    action: '',
    actionCode: '',
    notes: '',
    status: 'Хийгдэж буй',
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    weight: '',
    height: '',
    treatmentInstructions: '',
    regimen: '',
    prescriptionNotes: '',
    chronicDiseaseName: '',
    chronicDiseaseDescription: '',
    medicines: []
  });

  const [showMedicineDialog, setShowMedicineDialog] = useState(false);
  const [medicineForm, setMedicineForm] = useState({});

  const [showAddPatientDialog, setShowAddPatientDialog] = useState(false);
  const [newPatient, setNewPatient] = useState({
    lastName: '',
    firstName: '',
    registerNum: '',
    birthDate: '',
    gender: '',
    phone: '',
  });

  // Patients state
  const [patients, setPatients] = useState([]);
  // Examination history state
  const [examinations, setExaminations] = useState([]);

  // Серверээс patients fetch хийх useEffect
  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        showNotification('Та эхлээд нэвтрэх шаардлагатай', 'error');
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/patients`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Үйлчлүүлэгчдийн жагсаалт авахад алдаа гарлаа');
        const data = await response.json();
        setPatients(data);

        // URL-аас үйлчлүүлэгчийн мэдээллийг авах
        const searchParams = new URLSearchParams(window.location.search);
        const customerId = searchParams.get('customerId');
        const customerName = searchParams.get('customerName');
        const customerType = searchParams.get('customerType');
        const customerPhone = searchParams.get('customerPhone');

        // Хэрэв URL-д үйлчлүүлэгчийн мэдээлэл байвал автоматаар сонгох
        if (customerId && customerName) {
          const customer = {
            id: customerId,
            name: customerName,
            type: customerType,
            phone: customerPhone
          };
          handleSelectPatient(customer);
        }
      } catch (error) {
        showNotification('Үйлчлүүлэгчдийн жагсаалт авахад алдаа гарлаа', 'error');
      }
    };
    fetchPatients();
  }, []);

  // Fetch examination history for selected patient
  useEffect(() => {
    const fetchExaminations = async () => {
      if (!selectedPatient?.id && !selectedPatient?._id) {
        setExaminations([]);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        showNotification('Та эхлээд нэвтрэх шаардлагатай', 'error');
        router.push('/login');
        return;
      }

      try {
        const patientId = selectedPatient.id || selectedPatient._id;
        const response = await fetch(`http://localhost:8000/api/examination/history/${patientId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          showNotification('Таны нэвтрэх хугацаа дууссан байна. Дахин нэвтрэнэ үү', 'error');
          router.push('/login');
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setExaminations(data);
        } else {
          setExaminations([]);
        }
      } catch (error) {
        console.error('Үзлэгийн түүх авахад алдаа гарлаа:', error);
        setExaminations([]);
      }
    };
    fetchExaminations();
  }, [selectedPatient]);

  const showNotification = (message, severity = 'success') => {
    setNotification({ message, severity });
    // Auto-clear notification after it's shown
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  const handleBack = () => {
    router.push('/examination');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleDiagnosisChange = (event, newValue) => {
    if (newValue) {
      setFormData(prev => ({
        ...prev,
        diagnosis: newValue.label,
        diagnosisCode: newValue.code
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        diagnosis: '',
        diagnosisCode: ''
      }));
    }
  };

  const handleActionChange = (event, newValue) => {
    if (newValue) {
      setFormData(prev => ({
        ...prev,
        action: newValue.label,
        actionCode: newValue.code
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        action: '',
        actionCode: ''
      }));
    }
  };

  const handleOpenPatientDialog = () => {
    setPatientDialogOpen(true);
  };

  const handleClosePatientDialog = () => {
    setPatientDialogOpen(false);
  };

  const handlePatientSearchChange = (e) => {
    setPatientSearch(e.target.value);
  };

  const handleSelectPatient = async (patient) => {
    // Token шалгах
    const token = localStorage.getItem('token');
    if (!token) {
      showNotification('Та эхлээд нэвтрэх шаардлагатай', 'error');
      router.push('/login');
      return;
    }

    // patient.id байхгүй бол алдаа харуулна
    if (!patient || (!patient.id && !patient._id)) {
      showNotification('Үйлчлүүлэгчийн мэдээлэл олдсонгүй', 'error');
      return;
    }

    // patient.id эсвэл _id-г ашиглана
    const patientId = patient.id || patient._id;
    
    try {
      // First try to get the full patient data from the server
      const response = await fetch(`http://localhost:8000/api/patient/${patientId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      let fullPatient;
      if (response.ok) {
        fullPatient = await response.json();
      } else if (response.status === 401) {
        showNotification('Таны нэвтрэх хугацаа дууссан байна. Дахин нэвтрэнэ үү', 'error');
        router.push('/login');
        return;
      } else {
        // If server request fails, use the patient data we already have
        console.warn('Серверээс алдаа ирлээ, үйлчлүүлэгчийн мэдээллийг шууд ашиглана');
        fullPatient = patient;
      }

      // Үйлчлүүлэгчийн үндсэн мэдээллийг тохируулах
      setSelectedPatient(fullPatient);

      // Form state-д үндсэн мэдээллийг оноох
      setFormData(prev => ({
        ...prev,
        patientId: fullPatient.id || fullPatient._id,
        patientName: `${fullPatient.lastName || ''} ${fullPatient.firstName || ''}`.trim(),
        lastName: fullPatient.lastName || '',
        firstName: fullPatient.firstName || '',
        registerNum: fullPatient.registerNum || '',
        type: fullPatient.type || 'Анхан',
        school: fullPatient.school || '',
        profession: fullPatient.profession || '',
        age: fullPatient.age || '',
        gender: fullPatient.gender || '',
        birthDate: fullPatient.birthDate || '',
        phone: fullPatient.phone || '',
        date: new Date(),
        status: 'Хийгдэж буй'
      }));

      // Try to fetch additional patient data
      try {
        await fetchAllPatientData(fullPatient.id || fullPatient._id);
      } catch (error) {
        console.warn('Нэмэлт мэдээлэл авахад алдаа гарлаа:', error);
        showNotification('Нэмэлт мэдээлэл авахад алдаа гарлаа', 'warning');
      }

      // Үзлэгийн түүхийг авах
      try {
        const historyResponse = await fetch(`http://localhost:8000/api/examination/history/${patientId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (historyResponse.ok) {
          const historyData = await historyResponse.json();
          setExaminations(historyData);
        } else if (historyResponse.status === 404) {
          // Шинэ үйлчлүүлэгч бол үзлэгийн түүх байхгүй
          setExaminations([]);
          showNotification('Энэ үйлчлүүлэгчийн өмнөх үзлэгийн мэдээлэл олдсонгүй', 'info');
        } else if (historyResponse.status === 401) {
          showNotification('Таны нэвтрэх хугацаа дууссан байна. Дахин нэвтрэнэ үү', 'error');
          router.push('/login');
          return;
        }
      } catch (error) {
        console.error('Үзлэгийн түүх авахад алдаа гарлаа:', error);
        setExaminations([]);
        showNotification('Үзлэгийн түүх авахад алдаа гарлаа', 'warning');
      }

      setPatientDialogOpen(false);
    } catch (error) {
      console.error('Үйлчлүүлэгчийн мэдээлэл авахад алдаа гарлаа:', error);
      // Use the patient data we already have if the server request fails
      setSelectedPatient(patient);
      setFormData(prev => ({
        ...prev,
        patientId: patient.id || patient._id,
        patientName: `${patient.lastName || ''} ${patient.firstName || ''}`.trim(),
        lastName: patient.lastName || '',
        firstName: patient.firstName || '',
        registerNum: patient.registerNum || '',
        type: patient.type || 'Анхан',
        school: patient.school || '',
        profession: patient.profession || '',
        age: patient.age || '',
        gender: patient.gender || '',
        birthDate: patient.birthDate || '',
        phone: patient.phone || '',
        date: new Date(),
        status: 'Хийгдэж буй'
      }));
      showNotification('Серверээс алдаа гарсан тул үйлчлүүлэгчийн мэдээллийг шууд ашиглаж байна', 'warning');
    }
  };
  
  const handleUpdateAllergies = (updatedAllergies) => {
    setSelectedPatient(prevPatient => ({
      ...prevPatient,
      allergies: updatedAllergies
    }));
    showNotification('Харшлын мэдээлэл шинэчлэгдлээ');
  };
  
  const handleUpdateChronicDiseases = (updatedDiseases) => {
    setSelectedPatient(prevPatient => ({
      ...prevPatient,
      chronicDiseases: updatedDiseases
    }));
    showNotification('Архаг өвчний мэдээлэл шинэчлэгдлээ');
  };

  const handleAddPatient = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      showNotification('Та эхлээд нэвтрэх шаардлагатай', 'error');
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/patient', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newPatient),
      });
      if (!response.ok) throw new Error('Үйлчлүүлэгч нэмэхэд алдаа гарлаа');
      const savedPatient = await response.json();

      // Patients жагсаалтад нэмэх
      setPatients(prev => [...prev, savedPatient]);
      setSelectedPatient(savedPatient);

      // Үндсэн мэдээллийг formData-д оноох
      setFormData(prev => ({
        ...prev,
        patientId: savedPatient.id || savedPatient._id,
        patientName: `${savedPatient.lastName || ''} ${savedPatient.firstName || ''}`,
        lastName: savedPatient.lastName || '',
        firstName: savedPatient.firstName || '',
        registerNum: savedPatient.registerNum || '',
        type: savedPatient.type || '',
        school: savedPatient.school || '',
        profession: savedPatient.profession || '',
        age: savedPatient.age || '',
        gender: savedPatient.gender || '',
        birthDate: savedPatient.birthDate || '',
        phone: savedPatient.phone || '',
      }));

      setShowAddPatientDialog(false);
      setNewPatient({
        lastName: '',
        firstName: '',
        registerNum: '',
        birthDate: '',
        gender: '',
        phone: '',
      });
      showNotification('Шинэ үйлчлүүлэгч амжилттай нэмэгдлээ');
    } catch (err) {
      showNotification('Үйлчлүүлэгч нэмэхэд алдаа гарлаа', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await saveVitalSigns();
    await saveDiagnosis();
    await saveTreatment();
    await savePrescription();
    // Refresh examination history
    if (selectedPatient?.id || selectedPatient?._id) {
      const patientId = selectedPatient.id || selectedPatient._id;
      try {
        const response = await fetch(`http://localhost:8000/api/examination/history/${patientId}`);
        if (response.ok) {
          const data = await response.json();
          setExaminations(data);
        }
      } catch {}
    }
    showNotification('Бүх мэдээлэл амжилттай хадгалагдлаа');
    setLoading(false);
  };

  const saveVitalSigns = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showNotification('Та эхлээд нэвтрэх шаардлагатай', 'error');
      router.push('/login');
      return;
    }

    await fetch('http://localhost:8000/api/examination/vitals/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        patientId: selectedPatient.id,
        temperature: formData.temperature,
        bloodPressure: formData.bloodPressure,
        heartRate: formData.heartRate,
        respiratoryRate: formData.respiratoryRate,
        weight: formData.weight,
        height: formData.height,
        date: formData.date,
      }),
    });
  };

  const saveDiagnosis = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showNotification('Та эхлээд нэвтрэх шаардлагатай', 'error');
      router.push('/login');
      return;
    }

    await fetch('http://localhost:8000/api/examination/diagnosis/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        patientId: selectedPatient.id,
        diagnosis: formData.diagnosis,
        diagnosisCode: formData.diagnosisCode,
        action: formData.action,
        actionCode: formData.actionCode,
        notes: formData.notes,
        date: formData.date,
      }),
    });
  };

  const saveTreatment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showNotification('Та эхлээд нэвтрэх шаардлагатай', 'error');
      router.push('/login');
      return;
    }

    await fetch('http://localhost:8000/api/examination/treatment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        patientId: selectedPatient.id,
        treatmentInstructions: formData.treatmentInstructions,
        regimen: formData.regimen,
        date: formData.date,
      }),
    });
  };

  const savePrescription = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showNotification('Та эхлээд нэвтрэх шаардлагатай', 'error');
      router.push('/login');
      return;
    }

    await fetch('http://localhost:8000/api/examination/prescription/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        patientId: selectedPatient.id,
        medicines: formData.medicines,
        notes: formData.prescriptionNotes,
        date: formData.date,
      }),
    });
  };

  const fetchAllPatientData = async (patientId) => {
    if (!patientId) {
      showNotification('Үйлчлүүлэгчийн ID олдсонгүй', 'error');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      showNotification('Та эхлээд нэвтрэх шаардлагатай', 'error');
      router.push('/login');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    try {
      // Vital Signs авах
      const vitalsRes = await fetch(`http://localhost:8000/api/examination/vitals/${patientId}`, {
        headers
      });
      const vitals = vitalsRes.ok ? await vitalsRes.json() : {};

      // Diagnosis авах
      const diagnosisRes = await fetch(`http://localhost:8000/api/examination/diagnosis/${patientId}`, {
        headers
      });
      const diagnosis = diagnosisRes.ok ? await diagnosisRes.json() : {};

      // Treatment авах
      const treatmentRes = await fetch(`http://localhost:8000/api/examination/treatment/${patientId}`, {
        headers
      });
      const treatment = treatmentRes.ok ? await treatmentRes.json() : {};

      // Prescription авах
      const prescriptionRes = await fetch(`http://localhost:8000/api/examination/prescription/${patientId}`, {
        headers
      });
      const prescription = prescriptionRes.ok ? await prescriptionRes.json() : {};

      // Form state-д онооно
      setFormData(prev => ({
        ...prev,
        ...vitals,
        ...diagnosis,
        ...treatment,
        ...prescription,
      }));

      // Хэрэв бүх хүсэлт амжилтгүй болсон бол мэдэгдэл харуулах
      if (!vitalsRes.ok && !diagnosisRes.ok && !treatmentRes.ok && !prescriptionRes.ok) {
        showNotification('Энэ үйлчлүүлэгчийн өмнөх үзлэгийн мэдээлэл олдсонгүй', 'info');
      }
    } catch (error) {
      console.error('Нэмэлт мэдээлэл авахад алдаа гарлаа:', error);
      showNotification('Нэмэлт мэдээлэл авахад алдаа гарлаа', 'warning');
    }
  };

  const filteredPatients = patients.filter(patient => {
    const fullName = `${patient.lastName} ${patient.firstName}`.toLowerCase();
    const regNum = patient.registerNum?.toLowerCase() || '';
    const search = patientSearch.toLowerCase();
    return fullName.includes(search) || regNum.includes(search);
  });

  const generateObjectId = () => {
    const timestamp = Math.floor(Date.now() / 1000).toString(16);
    const randomPart = Math.random().toString(16).substring(2, 10);
    return `${timestamp}${randomPart}`;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'white', p: 3 }}>
      <Header onBack={handleBack} />

      <Box component="form" onSubmit={handleSubmit}>
        {selectedPatient ? (
          <>
            <PatientInfo 
              patient={selectedPatient} 
              onChangePatient={() => setSelectedPatient(null)} 
            />
            <PatientAllergies 
              allergies={selectedPatient.allergies || []} 
              onUpdate={handleUpdateAllergies} 
            />
            <PatientChronicDiseases 
              chronicDiseases={selectedPatient.chronicDiseases || []} 
              onUpdate={handleUpdateChronicDiseases} 
            />
            <PatientMedicalHistory 
              patient={selectedPatient}
              examinations={examinations}
            />
          </>
        ) : (
          <Box>
            <PatientSelection 
              onOpenDialog={handleOpenPatientDialog}
              onAddNewPatient={() => setShowAddPatientDialog(true)} // Шинэ үйлчлүүлэгч нэмэх callback
              patients={patients}
              onSelectPatient={handleSelectPatient}
            />
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              sx={{ mt: 2, display: 'none' }} // Одоо энэ товчийг нуух
              onClick={() => setShowAddPatientDialog(true)}
            >
              Шинэ үйлчлүүлэгч нэмэх
            </Button>
          </Box>
        )}

        <Box sx={{ opacity: selectedPatient ? 1 : 0.5, pointerEvents: selectedPatient ? 'auto' : 'none' }}>
          <ServiceCategories 
            tabValue={tabValue} 
            onChange={handleTabChange} 
          />

          {tabValue === 0 && (
            <VitalSigns 
              formData={formData} 
              onChange={handleChange} 
            />
          )}

          {tabValue === 1 && (
            <DiagnosisTab 
              formData={formData} 
              onChange={handleChange}
              onDateChange={handleDateChange}
              onDiagnosisChange={handleDiagnosisChange}
              onActionChange={handleActionChange}
              diagnosisOptions={diagnosisOptions}
              actionOptions={actionOptions}
            />
          )}

          {tabValue === 2 && (
            <TreatmentTab 
              formData={formData} 
              onChange={handleChange} 
            />
          )}

          {tabValue === 3 && (
            <>
              <PrescriptionTab 
                formData={formData} 
                onChange={handleChange} 
                onAddMedicine={() => setShowMedicineDialog(true)} 
              />
              <Dialog open={showMedicineDialog} onClose={() => setShowMedicineDialog(false)}>
                <DialogTitle>Эм нэмэх</DialogTitle>
                <DialogContent>
                  <TextField
                    label="Эмийн нэр"
                    value={medicineForm.name || ''}
                    onChange={e => setMedicineForm({ ...medicineForm, name: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Тун"
                    value={medicineForm.dosage || ''}
                    onChange={e => setMedicineForm({ ...medicineForm, dosage: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Хэрэглэх заавар"
                    value={medicineForm.instructions || ''}
                    onChange={e => setMedicineForm({ ...medicineForm, instructions: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowMedicineDialog(false)}>Болих</Button>
                  <Button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        medicines: [...(prev.medicines || []), medicineForm]
                      }));
                      setMedicineForm({});
                      setShowMedicineDialog(false);
                    }}
                    variant="contained"
                  >
                    Нэмэх
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
          
          <ActionButtons 
            onCancel={handleBack} 
            loading={loading} 
            onAddMedicine={() => setShowMedicineDialog(true)} 
            onSubmit={handleSubmit} 
          />
        </Box>
      </Box>

      <PatientSearchDialog 
        open={patientDialogOpen}
        onClose={handleClosePatientDialog}
        patients={filteredPatients}
        searchValue={patientSearch}
        onSearchChange={handlePatientSearchChange}
        onSelectPatient={handleSelectPatient}
      />

      <Dialog open={showAddPatientDialog} onClose={() => setShowAddPatientDialog(false)}>
        <DialogTitle>Шинэ үйлчлүүлэгч нэмэх</DialogTitle>
        <DialogContent>
          <TextField
            label="Овог"
            value={newPatient.lastName}
            onChange={e => setNewPatient({ ...newPatient, lastName: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Нэр"
            value={newPatient.firstName}
            onChange={e => setNewPatient({ ...newPatient, firstName: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Регистрийн дугаар"
            value={newPatient.registerNum}
            onChange={e => setNewPatient({ ...newPatient, registerNum: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Төрсөн огноо"
            type="date"
            value={newPatient.birthDate}
            onChange={e => setNewPatient({ ...newPatient, birthDate: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Хүйс"
            value={newPatient.gender}
            onChange={e => setNewPatient({ ...newPatient, gender: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Утас"
            value={newPatient.phone}
            onChange={e => setNewPatient({ ...newPatient, phone: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddPatientDialog(false)}>Болих</Button>
          <Button onClick={handleAddPatient} variant="contained">Хадгалах</Button>
        </DialogActions>
      </Dialog>

      {notification && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2000,
            minWidth: 300,
            maxWidth: '80%'
          }}
        >
          <Alert 
            severity={notification.severity} 
            variant="filled" 
            onClose={() => setNotification(null)}
            sx={{ boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)' }}
          >
            {notification.message}
          </Alert>
        </Box>
      )}
    </Box>
  );
}