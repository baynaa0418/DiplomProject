// src/app/patient/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchPatientExaminations } from '@/app/api/examinationService';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function PatientDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [examinations, setExaminations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExaminations = async () => {
      try {
        const data = await fetchPatientExaminations(id);
        setExaminations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadExaminations();
  }, [id]);

  const handleViewDetails = (examId) => {
    router.push(`/examination/${examId}`);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Үйлчлүүлэгчийн үзлэгийн түүх</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => router.push(`/patient/${id}/examination/new`)}
        >
          Шинэ үзлэг
        </Button>
      </Box>

      {/* Үзлэгийн хүснэгт */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Огноо</TableCell>
              <TableCell>Үзлэгийн төрөл</TableCell>
              <TableCell>Онош</TableCell>
              <TableCell>Төлөв</TableCell>
              <TableCell align="right">Үйлдэл</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examinations.map((exam, index) => (
              <TableRow key={exam._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{new Date(exam.exam_date).toLocaleDateString()}</TableCell>
                <TableCell>{exam.doctors_examination}</TableCell>
                <TableCell>{exam.diagnosis || '-'}</TableCell>
                <TableCell>{exam.status}</TableCell>
                <TableCell align="right">
                  <Button 
                    variant="outlined"
                    onClick={() => handleViewDetails(exam._id)}
                  >
                    Дэлгэрэнгүй
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}