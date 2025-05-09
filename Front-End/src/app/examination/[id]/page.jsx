// src/app/examination/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchExaminationDetails } from '@/app/api/examinationService';
import { Box, Typography, Button, Card, CardContent, Grid, Divider, Alert, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ExaminationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [examination, setExamination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExaminationDetails = async () => {
      try {
        const data = await fetchExaminationDetails(id);
        setExamination(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadExaminationDetails();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!examination) return <Typography>Үзлэг олдсонгүй</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Button 
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 2 }}
      >
        Буцах
      </Button>

      <Typography variant="h4" gutterBottom>
        Үзлэгийн дэлгэрэнгүй
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Үндсэн мэдээлэл
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Үзлэгийн огноо:</Typography>
                <Typography>
                  {new Date(examination.exam_date).toLocaleDateString()}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Үзлэгийн төрөл:</Typography>
                <Typography>{examination.doctors_examination}</Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Төлөв:</Typography>
                <Typography>{examination.status}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Онош, эмчилгээ
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {examination.diagnosis && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Онош:</Typography>
                  <Typography>{examination.diagnosis}</Typography>
                </Box>
              )}
              
              {examination.treatment && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Эмчилгээ:</Typography>
                  <Typography>{examination.treatment}</Typography>
                </Box>
              )}
              
              {examination.notes && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Тэмдэглэл:</Typography>
                  <Typography>{examination.notes}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}