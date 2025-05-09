// DiplomFront/Front-end/src/app/patient/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPatientExaminations } from '@/app/api/examinationService';
import { getPatientDetails } from '@/app/api/patientService';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExaminationTable from '@/app/components/ExaminationTable';
import PatientInfoCard from '@/app/components/PatientInfoCard';

export default function PatientDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [examinations, setExaminations] = useState([]);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [patientData, examsData] = await Promise.all([
          getPatientDetails(id),
          getPatientExaminations(id)
        ]);
        setPatient(patientData);
        setExaminations(examsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Үйлчлүүлэгчийн дэлгэрэнгүй</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => router.push(`/patient/${id}/examination/new`)}
        >
          Шинэ үзлэг
        </Button>
      </Box>

      <PatientInfoCard patient={patient} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Үзлэгийн түүх</Typography>
        <ExaminationTable 
          examinations={examinations} 
          onRowClick={(examId) => router.push(`/examination/${examId}`)}
        />
      </Box>
    </Box>
  );
}