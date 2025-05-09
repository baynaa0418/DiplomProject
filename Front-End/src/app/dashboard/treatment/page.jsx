'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Avatar
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import MedicationIcon from '@mui/icons-material/Medication';
import HealingIcon from '@mui/icons-material/Healing';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useRouter } from 'next/navigation';

// Mock data for treatments
const mockTreatments = [
  {
    id: 'TRT-001',
    patientId: 'ТАВ82520019',
    patientName: 'Батболд Дэлгэрцэцэг',
    doctorName: 'Б. Сүхбат',
    diagnosis: 'Ханиад (J00)',
    status: 'Хүлээгдэж буй',
    createdAt: '2025-04-15',
    scheduledDate: '2025-04-16',
    scheduledTime: '10:00',
    prescribedMedications: [
      {
        id: 'MED-001',
        name: 'Парацетамол',
        dosage: '500мг',
        frequency: '8 цаг тутамд',
        duration: '7 хоног',
        status: 'Хүлээгдэж буй'
      },
      {
        id: 'MED-002',
        name: 'Витамин C',
        dosage: '1000мг',
        frequency: 'Өдөрт 1 удаа',
        duration: '10 хоног',
        status: 'Хүлээгдэж буй'
      }
    ],
    prescribedTreatments: [
      {
        id: 'PRC-001',
        name: 'Дуслын эмчилгээ',
        details: 'Глюкозын 5%-ийн уусмал 500мл, витамин Б цогцолбор',
        duration: '30 минут',
        frequency: 'Өдөрт 1 удаа',
        days: '3 өдөр',
        status: 'Хүлээгдэж буй'
      }
    ],
    instructions: 'Эмчилгээний явцад тогтмол халуун хэмжиж, 38.5°C-аас дээш үед эмчид мэдэгдэх'
  },
  {
    id: 'TRT-002',
    patientId: 'ТАД12322020',
    patientName: 'Нямжав Наранчимэг',
    doctorName: 'Д. Шинэбаяр',
    diagnosis: 'Багтраа (J45.9)',
    status: 'Хийгдэж буй',
    createdAt: '2025-04-15',
    scheduledDate: '2025-04-16',
    scheduledTime: '11:30',
    prescribedMedications: [
      {
        id: 'MED-003',
        name: 'Сальбутамол',
        dosage: '2 шүршилт',
        frequency: '4-6 цаг тутамд шаардлагатай үед',
        duration: '7 хоног',
        status: 'Хийгдэж буй'
      }
    ],
    prescribedTreatments: [
      {
        id: 'PRC-002',
        name: 'Хүчилтөрөгчийн эмчилгээ',
        details: '2-3 л/мин хурдтайгаар хамрын гуурсаар',
        duration: '15 минут',
        frequency: 'Шаардлагатай үед',
        days: '1 өдөр',
        status: 'Хийгдэж буй'
      },
      {
        id: 'PRC-003',
        name: 'Небулайзер эмчилгээ',
        details: 'Сальбутамол 2.5мг + Физиологийн уусмал 2мл',
        duration: '10 минут',
        frequency: 'Өдөрт 3 удаа',
        days: '3 өдөр',
        status: 'Хүлээгдэж буй'
      }
    ],
    instructions: 'Өвчтөний амьсгалын тоо, зүрхний цохилт, хүчилтөрөгчийн ханамжийг тогтмол хянах'
  },
  {
    id: 'TRT-003',
    patientId: 'ТАБ23220020',
    patientName: 'Батболд Эрдэнэ',
    doctorName: 'Г. Хулан',
    diagnosis: 'Шумуулын хазалт (T63.4)',
    status: 'Дууссан',
    createdAt: '2025-04-14',
    scheduledDate: '2025-04-15',
    scheduledTime: '14:00',
    prescribedMedications: [
      {
        id: 'MED-004',
        name: 'Лоратадин',
        dosage: '10мг',
        frequency: 'Өдөрт 1 удаа',
        duration: '3 өдөр',
        status: 'Дууссан'
      }
    ],
    prescribedTreatments: [
      {
        id: 'PRC-004',
        name: 'Хазсан хэсгийг цэвэрлэх',
        details: 'Усаар угааж, антисептик тавих',
        duration: '10 минут',
        frequency: 'Өдөрт 2 удаа',
        days: '1 өдөр',
        status: 'Дууссан'
      }
    ],
    instructions: 'Хавдсан хэсгийг ажиглаж, улаан судал үүсвэл эмчид яаралтай мэдүүлэх'
  }
];

const TreatmentListPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState(new Date());
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  
  // State to track how many times a treatment has been administered
  const [administeredCounts, setAdministeredCounts] = useState({});

  // Filter handlers
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleDateFilterChange = (date) => {
    setDateFilter(date);
  };

  const handleOpenFilterDialog = () => {
    setFilterDialogOpen(true);
  };

  const handleCloseFilterDialog = () => {
    setFilterDialogOpen(false);
  };

  const applyFilters = () => {
    handleCloseFilterDialog();
    console.log('Filters applied:', { statusFilter, dateFilter });
  };

  const filteredTreatments = mockTreatments.filter((treatment) => {
    // Фильтр төлөвөөр
    if (statusFilter !== 'all' && treatment.status !== statusFilter) {
      return false;
    }
    // Хайлт query-аар
    const searchLower = searchQuery.toLowerCase();
    return (
      treatment.patientName.toLowerCase().includes(searchLower) ||
      treatment.patientId.toLowerCase().includes(searchLower) ||
      treatment.diagnosis.toLowerCase().includes(searchLower)
    );
  });

  // Detail dialog functions
  const handleViewDetails = (treatment) => {
    setSelectedTreatment(treatment);
    setDetailsOpen(true);
    setTabValue(0); // Анхнаасаа Эмийн tab
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

  // Status chip туслах функцүүд
  const getStatusColor = (status) => {
    switch (status) {
      case 'Хүлээгдэж буй':
        return 'warning';
      case 'Хийгдэж буй':
        return 'info';
      case 'Дууссан':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Хүлээгдэж буй':
        return <PendingIcon fontSize="small" />;
      case 'Хийгдэж буй':
        return <ScheduleIcon fontSize="small" />;
      case 'Дууссан':
        return <CheckCircleIcon fontSize="small" />;
      default:
        return null;
    }
  };

  // Эмийн үйлдлийн логик
  const handleAdministerMedication = (medicationId) => {
    if (selectedTreatment) {
      const updatedMedications = selectedTreatment.prescribedMedications.map((med) => {
        if (med.id === medicationId) {
          // materialTaken шинж чанар байгаа эсэхийг шалгана.
          if (!med.materialTaken) {
            // Хэрэв эхлэх үед материал авч аваагүй бол, материалыг авч дууссан байдлаар тэмдэглэнэ.
            return { ...med, status: 'Дууссан', materialTaken: true };
          } else {
            console.log('Энэ эмийн материал аль хэдийн авч дууссан байна.');
            return med;
          }
        }
        return med;
      });
      setSelectedTreatment({
        ...selectedTreatment,
        prescribedMedications: updatedMedications
      });
    }
  };

  // Эмчилгээний үйлдлийн логик: Тухайн эмчилгээ 5 дахь үйлдлээс зөвхөн 3 удаа гүйцэтгэх болзлыг шалгана.
  const handleAdministerTreatment = (treatmentId) => {
    const currentCount = administeredCounts[treatmentId] || 0;
    if (currentCount < 3) {
      const newCount = currentCount + 1;
      const updatedTreatments = selectedTreatment.prescribedTreatments.map((trt) =>
        trt.id === treatmentId
          ? {
              ...trt,
              status: newCount >= 3 ? 'Дууссан' : trt.status,
              administeredCount: newCount
            }
          : trt
      );
      setSelectedTreatment({
        ...selectedTreatment,
        prescribedTreatments: updatedTreatments
      });
      setAdministeredCounts({
        ...administeredCounts,
        [treatmentId]: newCount
      });
      console.log(`Эмчилгээ ${treatmentId}-г ${newCount} удаа гүйцэтгэсэн байна.`);
    } else {
      console.log(`Эмчилгээ ${treatmentId} шаардлагатай тоо (3 удаа) дууссан байна.`);
    }
  };

  // Бүх үйлдлийг дуусгах
  const handleCompleteAll = () => {
    if (selectedTreatment) {
      const updatedMedications = selectedTreatment.prescribedMedications.map((med) => ({
        ...med,
        status: 'Дууссан',
        materialTaken: true
      }));
      const updatedTreatments = selectedTreatment.prescribedTreatments.map((trt) => ({
        ...trt,
        status: 'Дууссан'
      }));
      setSelectedTreatment({
        ...selectedTreatment,
        status: 'Дууссан',
        prescribedMedications: updatedMedications,
        prescribedTreatments: updatedTreatments
      });
    }
  };

  // Тэмдэглэл нэмэх dialog функцүүд
  const handleOpenNoteDialog = () => {
    setNoteDialogOpen(true);
  };

  const handleCloseNoteDialog = () => {
    setNoteDialogOpen(false);
  };

  const handleSaveNote = () => {
    console.log('Note saved:', noteText);
    handleCloseNoteDialog();
    setNoteText('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'white', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleBack}
            sx={{
              color: 'primary.main',
              bgcolor: 'rgba(25, 118, 210, 0.08)',
              mr: 1,
              '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.12)' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight="600">
            Сувилагчийн эмчилгээний хуудас
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Өдөр"
              value={dateFilter}
              onChange={handleDateFilterChange}
              slotProps={{ textField: { size: 'small', sx: { width: 150 } } }}
              format="yyyy-MM-dd"
            />
          </LocalizationProvider>
          <Button variant="outlined" startIcon={<FilterListIcon />} onClick={handleOpenFilterDialog} size="small">
            Шүүлтүүр
          </Button>
        </Box>
      </Box>

      {/* Search */}
      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Үйлчлүүлэгчийн нэр, ID, онош хайх"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
            }}
          />
        </CardContent>
      </Card>

      {/* Status summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 2, borderLeft: '4px solid #ff9800', height: '100%' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Хүлээгдэж буй
              </Typography>
              <Typography variant="h4" fontWeight="600" sx={{ mt: 1 }}>
                {mockTreatments.filter((t) => t.status === 'Хүлээгдэж буй').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 2, borderLeft: '4px solid #03a9f4', height: '100%' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Хийгдэж буй
              </Typography>
              <Typography variant="h4" fontWeight="600" sx={{ mt: 1 }}>
                {mockTreatments.filter((t) => t.status === 'Хийгдэж буй').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 2, borderLeft: '4px solid #4caf50', height: '100%' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Дууссан
              </Typography>
              <Typography variant="h4" fontWeight="600" sx={{ mt: 1 }}>
                {mockTreatments.filter((t) => t.status === 'Дууссан').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Treatment list */}
      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table size="medium">
              <TableHead>
                <TableRow sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Үйлчлүүлэгч</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Онош</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Эмч</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Цаг</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Төлөв</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Үйлдэл</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTreatments.length > 0 ? (
                  filteredTreatments.map((treatment) => (
                    <TableRow key={treatment.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32, mr: 1 }}>
                            <PersonIcon fontSize="small" />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="500">
                              {treatment.patientName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {treatment.patientId}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{treatment.diagnosis}</TableCell>
                      <TableCell>{treatment.doctorName}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2">{treatment.scheduledTime}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={treatment.status}
                          size="small"
                          color={getStatusColor(treatment.status)}
                          icon={getStatusIcon(treatment.status)}
                          sx={{ borderRadius: '4px', fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleViewDetails(treatment)}
                          sx={{ borderRadius: '8px', textTransform: 'none' }}
                        >
                          Дэлгэрэнгүй
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography color="text.secondary">Эмчилгээний жагсаалт хоосон байна</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Filter dialog */}
      <Dialog open={filterDialogOpen} onClose={handleCloseFilterDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Шүүлтүүр</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Төлөв</InputLabel>
              <Select value={statusFilter} onChange={handleStatusFilterChange} label="Төлөв">
                <MenuItem value="all">Бүгд</MenuItem>
                <MenuItem value="Хүлээгдэж буй">Хүлээгдэж буй</MenuItem>
                <MenuItem value="Хийгдэж буй">Хийгдэж буй</MenuItem>
                <MenuItem value="Дууссан">Дууссан</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Өдөр"
                value={dateFilter}
                onChange={handleDateFilterChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal'
                  }
                }}
                format="yyyy-MM-dd"
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFilterDialog} color="inherit">
            Цуцлах
          </Button>
          <Button onClick={applyFilters} variant="contained">
            Хайх
          </Button>
        </DialogActions>
      </Dialog>

      {/* Treatment details dialog */}
      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2, maxHeight: '90vh' } }}
      >
        {selectedTreatment && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Эмчилгээний дэлгэрэнгүй</Typography>
                <Chip
                  label={selectedTreatment.status}
                  size="small"
                  color={getStatusColor(selectedTreatment.status)}
                  icon={getStatusIcon(selectedTreatment.status)}
                  sx={{ borderRadius: '4px', fontWeight: 500 }}
                />
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              {/* Patient Info */}
              <Card sx={{ mb: 3, borderRadius: 2 }}>
                <CardContent sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: 'primary.light', width: 40, height: 40, mr: 1.5 }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="600">
                            {selectedTreatment.patientName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedTreatment.patientId}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: { xs: 'flex-start', md: 'flex-end' }
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Эмч: {selectedTreatment.doctorName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Огноо: {selectedTreatment.scheduledDate}, {selectedTreatment.scheduledTime}
                        </Typography>
                        <Typography variant="body2" fontWeight="500">
                          Онош: {selectedTreatment.diagnosis}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab
                  label="Эм"
                  icon={<MedicationIcon />}
                  iconPosition="start"
                  sx={{ textTransform: 'none' }}
                />
                <Tab
                  label="Эмчилгээ"
                  icon={<HealingIcon />}
                  iconPosition="start"
                  sx={{ textTransform: 'none' }}
                />
                <Tab
                  label="Заавар"
                  icon={<EventNoteIcon />}
                  iconPosition="start"
                  sx={{ textTransform: 'none' }}
                />
              </Tabs>

              <Box sx={{ minHeight: 300 }}>
                {/* Medications tab */}
                {tabValue === 0 && (
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
                      Эмийн зааврууд
                    </Typography>
                    {selectedTreatment.prescribedMedications.length > 0 ? (
                      <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                              <TableCell sx={{ fontWeight: 600 }}>Эмийн нэр</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Тун</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Давтамж</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Үргэлжлэх хугацаа</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Төлөв</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 600 }}>Үйлдэл</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectedTreatment.prescribedMedications.map((medication) => (
                              <TableRow key={medication.id}>
                                <TableCell>{medication.name}</TableCell>
                                <TableCell>{medication.dosage}</TableCell>
                                <TableCell>{medication.frequency}</TableCell>
                                <TableCell>{medication.duration}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={medication.status}
                                    size="small"
                                    color={getStatusColor(medication.status)}
                                    sx={{ borderRadius: '4px' }}
                                  />
                                </TableCell>
                                <TableCell align="right">
                                  <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    onClick={() => handleAdministerMedication(medication.id)}
                                    disabled={medication.status === 'Дууссан'}
                                    sx={{ borderRadius: '8px', textTransform: 'none', minWidth: 100 }}
                                  >
                                    {medication.status === 'Дууссан' ? 'Дууссан' : 'Өгөх'}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography color="text.secondary">Эмийн жагсаалт хоосон байна</Typography>
                      </Box>
                    )}
                  </Box>
                )}

                {/* Treatments tab */}
                {tabValue === 1 && (
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
                      Эмчилгээ
                    </Typography>
                    {selectedTreatment.prescribedTreatments.length > 0 ? (
                      <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                              <TableCell sx={{ fontWeight: 600 }}>Эмчилгээний нэр</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Дэлгэрэнгүй</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Хугацаа</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Давтамж</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Өдөр</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Төлөв</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 600 }}>Үйлдэл</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectedTreatment.prescribedTreatments.map((treatment) => (
                              <TableRow key={treatment.id}>
                                <TableCell>{treatment.name}</TableCell>
                                <TableCell>{treatment.details}</TableCell>
                                <TableCell>{treatment.duration}</TableCell>
                                <TableCell>{treatment.frequency}</TableCell>
                                <TableCell>{treatment.days}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={treatment.status}
                                    size="small"
                                    color={getStatusColor(treatment.status)}
                                    sx={{ borderRadius: '4px' }}
                                  />
                                </TableCell>
                                <TableCell align="right">
                                  <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    onClick={() => handleAdministerTreatment(treatment.id)}
                                    disabled={treatment.status === 'Дууссан'}
                                    sx={{ borderRadius: '8px', textTransform: 'none', minWidth: 100 }}
                                  >
                                    {treatment.status === 'Дууссан' ? 'Дууссан' : 'Өгөх'}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography color="text.secondary">Эмчилгээний жагсаалт хоосон байна</Typography>
                      </Box>
                    )}
                  </Box>
                )}

                {/* Instructions tab */}
                {tabValue === 2 && (
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
                      Эмчилгээний заавар
                    </Typography>
                    {selectedTreatment.instructions ? (
                      <Typography variant="body1">{selectedTreatment.instructions}</Typography>
                    ) : (
                      <Typography color="text.secondary">Заавар байхгүй байна</Typography>
                    )}
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCompleteAll} variant="contained" color="primary">
                Бүх зүйлийг дуусгах
              </Button>
              <Button onClick={handleOpenNoteDialog} variant="outlined" startIcon={<NoteAddIcon />}>
                Тэмдэглэл нэмэх
              </Button>
              <Button onClick={handleCloseDetails} color="inherit">
                Хаах
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Note dialog */}
      <Dialog open={noteDialogOpen} onClose={handleCloseNoteDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Тэмдэглэл нэмэх</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Энд тэмдэглэл бичнэ үү..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNoteDialog} color="inherit">
            Цуцлах
          </Button>
          <Button onClick={handleSaveNote} variant="contained">
            Хадгалах
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TreatmentListPage;
