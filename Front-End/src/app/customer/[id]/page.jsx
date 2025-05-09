'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Snackbar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

export default function CustomerDetail({ params }) {
  const router = useRouter();
  const { id } = React.use(params); // Fixed: Properly unwrap params

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Нэвтрэх шаардлагатай');
        }
  
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patient/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.status === 401) {
          localStorage.removeItem('token');
          throw new Error('Хандах эрх хүчингүй');
        }
  
        const data = await response.json();
        setCustomer(data);
      } catch (err) {
        setError(err.message);
        if (err.message.includes('Нэвтрэх') || err.message.includes('Хандах')) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchCustomerData();
  }, [id, router]);
  const handleBack = () => {
    router.push('/dashboard/customer');
  };

  const handleEdit = () => {
    router.push(`/customer/edit/${id}`);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          onClick={() => window.location.reload()} 
          variant="contained" 
          sx={{ mt: 2 }}
        >
          Дахин оролдох
        </Button>
        <Button 
          onClick={handleBack} 
          variant="outlined" 
          sx={{ mt: 2, ml: 2 }}
        >
          Буцах
        </Button>
      </Box>
    );
  }

  if (!customer) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Үйлчлүүлэгч олдсонгүй</Alert>
        <Button 
          onClick={handleBack} 
          variant="contained" 
          sx={{ mt: 2 }}
        >
          Үйлчлүүлэгчийн жагсаалт руу буцах
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Notification Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ textTransform: 'none' }}
        >
          Буцах
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleEdit}
          sx={{ textTransform: 'none' }}
        >
          Засах
        </Button>
      </Box>

      {/* Customer Info */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
              fontSize: '2rem',
              mr: 2
            }}
          >
            {customer.name?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5" gutterBottom>
              {customer.name}
            </Typography>
            <Typography color="text.secondary">
              {customer.type}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Төрсөн огноо</Typography>
            <Typography variant="body1" gutterBottom>{customer.birthDate || 'Байхгүй'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Нас</Typography>
            <Typography variant="body1" gutterBottom>{customer.age || 'Байхгүй'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Утас</Typography>
            <Typography variant="body1" gutterBottom>{customer.phone || 'Байхгүй'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">Хаяг</Typography>
            <Typography variant="body1" gutterBottom>{customer.address || 'Байхгүй'}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
      >
        <Tab label="Амин үзүүлэлт" />
        <Tab label="Үзлэгийн түүх" />
        <Tab label="Эмчилгээний түүх" />
        <Tab label="Өвчний түүх" />
      </Tabs>

      {/* Tab Content */}
      {tabValue === 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Амин үзүүлэлт</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">Цусны даралт</Typography>
              <Typography variant="body1" gutterBottom>{customer.healthIndicators?.bloodPressure || '-'}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">Зүрхний цохилт</Typography>
              <Typography variant="body1" gutterBottom>{customer.healthIndicators?.heartRate || '-'}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">Биеийн хэм</Typography>
              <Typography variant="body1" gutterBottom>{customer.healthIndicators?.temperature || '-'}°C</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">Жин</Typography>
              <Typography variant="body1" gutterBottom>{customer.healthIndicators?.weight || '-'} кг</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">Өндөр</Typography>
              <Typography variant="body1" gutterBottom>{customer.healthIndicators?.height || '-'} см</Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Үзлэгийн түүх</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Огноо</TableCell>
                  <TableCell>Эмч</TableCell>
                  <TableCell>Онош</TableCell>
                  <TableCell>Тэмдэглэл</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customer.examinations?.length > 0 ? (
                  customer.examinations.map((exam, index) => (
                    <TableRow key={index}>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.doctor}</TableCell>
                      <TableCell>{exam.diagnosis}</TableCell>
                      <TableCell>{exam.notes}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Үзлэгийн түүх байхгүй
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {tabValue === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Эмчилгээний түүх</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Огноо</TableCell>
                  <TableCell>Эмчилгээ</TableCell>
                  <TableCell>Хугацаа</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customer.treatments?.length > 0 ? (
                  customer.treatments.map((treatment, index) => (
                    <TableRow key={index}>
                      <TableCell>{treatment.date}</TableCell>
                      <TableCell>{treatment.treatment}</TableCell>
                      <TableCell>{treatment.duration}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Эмчилгээний түүх байхгүй
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {tabValue === 3 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Өвчний түүх</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Он</TableCell>
                  <TableCell>Тайлбар</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customer.medicalHistory?.length > 0 ? (
                  customer.medicalHistory.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.year}</TableCell>
                      <TableCell>{item.description}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      Өвчний түүх байхгүй
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}