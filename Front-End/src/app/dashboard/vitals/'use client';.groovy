'use client';

import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Pagination, Tabs, Tab, Menu, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Divider, FormControl, InputLabel, Select, Stack,
  Card, CardContent, Grid, Avatar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Mock data for examinations
const initialExaminations = [
  {
    id: 1,
    date: '2023-05-09',
    lastName: 'Нямжав',
    firstName: 'Наранчимэг',
    type: 'Анхан',
    diagnosis: 'A01.1 - A ижбанадад',
    action: 'Z-40',
    status: 'Дууссан',
    patientId: 'PAT001'
  },
  {
    id: 2,
    date: '2023-05-09',
    lastName: 'Батболд',
    firstName: 'Дэлгэрцэцэг',
    type: 'Анхан',
    diagnosis: 'A04.8 - Үүсгэгч нь тогтоогдоогүй гэдэсний бусад бактери халдвар',
    action: 'Z-40',
    status: 'Хийгдэж буй',
    patientId: 'PAT002'
  },
  {
    id: 3,
    date: '2023-05-09',
    lastName: 'Батболд',
    firstName: 'Эрдэнэ',
    type: 'Анхан',
    diagnosis: 'Онош тогтоогдоогүй',
    action: 'Z-40',
    status: 'Хийгдэж буй',
    patientId: 'PAT003'
  },
  {
    id: 4,
    date: '2023-05-09',
    lastName: 'Батболд',
    firstName: 'Дэлгэрцэцэг',
    type: 'Давтан',
    diagnosis: 'A01.3 - C ижбанадад',
    action: 'Z-18',
    status: 'Дууссан',
    patientId: 'PAT002'
  },
  {
    id: 5,
    date: '2023-05-10',
    lastName: 'Цогтбаатар',
    firstName: 'Тэмүүлэн',
    type: 'Давтан',
    diagnosis: 'B02.0 - Херпес зостер сэтгэцийн хүндрэлгүй',
    action: 'Z-20',
    status: 'Дууссан',
    patientId: 'PAT004'
  },
  {
    id: 6,
    date: '2023-05-11',
    lastName: 'Эрдэнэбилэг',
    firstName: 'Сарантуяа',
    type: 'Анхан',
    diagnosis: 'J00 - Ханиад',
    action: 'Z-01',
    status: 'Хийгдэж буй',
    patientId: 'PAT005'
  }
];

// Mock patient details data
const patientDetails = {
  'PAT001': {
    id: 'PAT001',
    fullName: 'Нямжав Наранчимэг',
    gender: 'Эмэгтэй',
    birthDate: '1985-03-15',
    bloodType: 'AB+',
    phone: '99112233',
    address: 'Улаанбаатар, Баянзүрх дүүрэг',
    registrationDate: '2020-05-10',
    vitalSigns: [
      { date: '2023-05-09', bloodPressure: '120/80', heartRate: '72', temperature: '36.6', weight: '58', height: '165' },
      { date: '2023-04-15', bloodPressure: '118/78', heartRate: '70', temperature: '36.5', weight: '57', height: '165' }
    ],
    medicalHistory: [
      { date: '2022-10-12', diagnosis: 'J00 - Ханиад', treatment: 'Амоксициллин 500mg 3х өдөрт 7 хоног' },
      { date: '2021-06-05', diagnosis: 'A01.1 - A ижбанадад', treatment: 'Ciprofloxacin 500mg 2х өдөрт 10 хоног' }
    ],
    examinationHistory: [
      { date: '2023-05-09', type: 'Анхан', diagnosis: 'A01.1 - A ижбанадад', doctor: 'Д. Эрдэнэбат', status: 'Дууссан' },
      { date: '2022-12-10', type: 'Давтан', diagnosis: 'J18.9 - Уушгины хатгалгаа', doctor: 'Д. Эрдэнэбат', status: 'Дууссан' }
    ]
  },
  'PAT002': {
    id: 'PAT002',
    fullName: 'Батболд Дэлгэрцэцэг',
    gender: 'Эрэгтэй',
    birthDate: '1978-07-22',
    bloodType: 'O+',
    phone: '88997766',
    address: 'Улаанбаатар, Хан-Уул дүүрэг',
    registrationDate: '2019-11-05',
    vitalSigns: [
      { date: '2023-05-09', bloodPressure: '130/85', heartRate: '78', temperature: '36.8', weight: '75', height: '178' }
    ],
    medicalHistory: [
      { date: '2022-08-20', diagnosis: 'A04.8 - Гэдэсний бактери халдвар', treatment: 'Metronidazole 400mg 3х өдөрт 7 хоног' }
    ],
    examinationHistory: [
      { date: '2023-05-09', type: 'Анхан', diagnosis: 'A04.8 - Үүсгэгч нь тогтоогдоогүй гэдэсний бусад бактери халдвар', doctor: 'Д. Эрдэнэбат', status: 'Хийгдэж буй' },
      { date: '2023-05-09', type: 'Давтан', diagnosis: 'A01.3 - C ижбанадад', doctor: 'Д. Эрдэнэбат', status: 'Дууссан' }
    ]
  },
  'PAT003': {
    id: 'PAT003',
    fullName: 'Батболд Эрдэнэ',
    gender: 'Эрэгтэй',
    birthDate: '1982-11-30',
    bloodType: 'B+',
    phone: '99887766',
    address: 'Улаанбаатар, Сүхбаатар дүүрэг',
    registrationDate: '2021-02-15',
    vitalSigns: [
      { date: '2023-05-09', bloodPressure: '125/82', heartRate: '75', temperature: '36.7', weight: '80', height: '175' }
    ],
    medicalHistory: [],
    examinationHistory: [
      { date: '2023-05-09', type: 'Анхан', diagnosis: 'Онош тогтоогдоогүй', doctor: 'Д. Эрдэнэбат', status: 'Хийгдэж буй' }
    ]
  },
  'PAT004': {
    id: 'PAT004',
    fullName: 'Цогтбаатар Тэмүүлэн',
    gender: 'Эмэгтэй',
    birthDate: '1990-05-18',
    bloodType: 'A+',
    phone: '99001122',
    address: 'Улаанбаатар, Баянгол дүүрэг',
    registrationDate: '2022-03-10',
    vitalSigns: [
      { date: '2023-05-10', bloodPressure: '118/76', heartRate: '68', temperature: '36.4', weight: '62', height: '168' }
    ],
    medicalHistory: [
      { date: '2022-07-15', diagnosis: 'B02.0 - Херпес зостер', treatment: 'Acyclovir 800mg 5х өдөрт 7 хоног' }
    ],
    examinationHistory: [
      { date: '2023-05-10', type: 'Давтан', diagnosis: 'B02.0 - Херпес зостер сэтгэцийн хүндрэлгүй', doctor: 'Д. Эрдэнэбат', status: 'Дууссан' }
    ]
  },
  'PAT005': {
    id: 'PAT005',
    fullName: 'Эрдэнэбилэг Сарантуяа',
    gender: 'Эмэгтэй',
    birthDate: '1995-09-25',
    bloodType: 'O-',
    phone: '99119911',
    address: 'Улаанбаатар, Чингэлтэй дүүрэг',
    registrationDate: '2023-01-20',
    vitalSigns: [
      { date: '2023-05-11', bloodPressure: '110/70', heartRate: '65', temperature: '36.9', weight: '55', height: '160' }
    ],
    medicalHistory: [],
    examinationHistory: [
      { date: '2023-05-11', type: 'Анхан', diagnosis: 'J00 - Ханиад', doctor: 'Д. Эрдэнэбат', status: 'Хийгдэж буй' }
    ]
  }
};

export default function ExaminationPage() {
  const [examinations, setExaminations] = useState(initialExaminations);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [detailsTab, setDetailsTab] = useState(0); // 0: Үндсэн, 1: Үзлэг, 2: Эмчилгээ, 3: Өвчин
  
  // Dialog states
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  
  // Edit form data
  const [editFormData, setEditFormData] = useState({
    id: '',
    date: '',
    lastName: '',
    firstName: '',
    type: '',
    diagnosis: '',
    action: '',
    status: '',
    patientId: ''
  });

  const ITEMS_PER_PAGE = 4;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1);
  };

  const handleMoreClick = (event, exam) => {
    setAnchorEl(event.currentTarget);
    setSelectedExam(exam);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  
  const handleEdit = () => {
    setEditFormData({ ...selectedExam });
    setOpenEditDialog(true);
    handleCloseMenu();
  };
  
  const handleDelete = () => {
    setOpenDeleteConfirm(true);
    handleCloseMenu();
  };
  
  const handleViewDetails = () => {
    const patientId = selectedExam?.patientId;
    if (patientId && patientDetails[patientId]) {
      setSelectedPatient(patientDetails[patientId]);
      setViewMode('detail');
      setDetailsTab(0);
    }
    handleCloseMenu();
  };
  
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedPatient(null);
  };
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const saveEdit = () => {
    setExaminations((prev) =>
      prev.map((exam) =>
        exam.id === editFormData.id ? { ...editFormData } : exam
      )
    );
    setOpenEditDialog(false);
  };
  
  const confirmDelete = () => {
    setExaminations((prev) => prev.filter((exam) => exam.id !== selectedExam.id));
    setOpenDeleteConfirm(false);
  };
  
  const cancelDelete = () => {
    setOpenDeleteConfirm(false);
  };
  
  const addNewExamination = () => {
    alert('Шинэ үзлэг нэмэх функц');
  };

  const filtered = examinations.filter((item) => {
    const matchesSearch = item.firstName.toLowerCase().includes(search.toLowerCase()) ||
      item.lastName.toLowerCase().includes(search.toLowerCase());
    
    const matchesTab =
      tabValue === 0 ||
      (tabValue === 1 && item.status === 'Хийгдэж буй') ||
      (tabValue === 2 && item.type === 'Анхан') ||
      (tabValue === 3 && item.type === 'Давтан');
      
    return matchesSearch && matchesTab;
  });

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  if (viewMode === 'detail' && selectedPatient) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'white' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Button 
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToList}
            sx={{ 
              alignSelf: 'flex-start', 
              mb: 2,
              textTransform: 'none'
            }}
          >
            Буцах
          </Button>
          
          {/* Patient Header */}
          <Card sx={{ mb: 3, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar sx={{ width: 80, height: 80, fontSize: 32 }}>
                  {selectedPatient.fullName.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="600">{selectedPatient.fullName}</Typography>
                  <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
                    <Typography><strong>Регистрийн дугаар:</strong> {selectedPatient.id}</Typography>
                    <Typography><strong>Хүйс:</strong> {selectedPatient.gender}</Typography>
                    <Typography><strong>Төрсөн огноо:</strong> {selectedPatient.birthDate}</Typography>
                    <Typography><strong>Цусны бүлэг:</strong> {selectedPatient.bloodType}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
                    <Typography><strong>Утас:</strong> {selectedPatient.phone}</Typography>
                    <Typography><strong>Хаяг:</strong> {selectedPatient.address}</Typography>
                    <Typography><strong>Бүртгүүлсэн:</strong> {selectedPatient.registrationDate}</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          {/* Tabs */}
          <Tabs
            value={detailsTab}
            onChange={(e, newValue) => setDetailsTab(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab label="Үндсэн мэдээлэл" />
            <Tab label="Үзлэгийн түүх" />
            <Tab label="Эмчилгээний түүх" />
            <Tab label="Өвчний түүх" />
          </Tabs>
          
          {/* Content */}
          <Box sx={{ flex: 1 }}>
            {detailsTab === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Амин үзүүлэлт
                </Typography>
                {selectedPatient.vitalSigns.length > 0 ? (
                  <Grid container spacing={2}>
                    {selectedPatient.vitalSigns.map((vital, index) => (
                      <React.Fragment key={index}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="text.secondary">
                            {vital.date}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                          <Typography variant="body2" color="text.secondary">Цусны даралт</Typography>
                          <Typography variant="h5">{vital.bloodPressure} mmHg</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                          <Typography variant="body2" color="text.secondary">Зүрхний цохилт</Typography>
                          <Typography variant="h5">{vital.heartRate} /мин</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                          <Typography variant="body2" color="text.secondary">Биеийн хэм</Typography>
                          <Typography variant="h5">{vital.temperature} °C</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                          <Typography variant="body2" color="text.secondary">Жин/Өндөр</Typography>
                          <Typography variant="h5">{vital.weight} kg / {vital.height} cm</Typography>
                        </Grid>
                      </React.Fragment>
                    ))}
                  </Grid>
                ) : (
                  <Typography>Амин үзүүлэлт оруулаагүй байна</Typography>
                )}
              </Box>
            )}
            
            {detailsTab === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Үзлэгийн түүх
                </Typography>
                {selectedPatient.examinationHistory.length > 0 ? (
                  <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell><strong>№</strong></TableCell>
                          <TableCell><strong>Огноо</strong></TableCell>
                          <TableCell><strong>Үзлэгийн төрөл</strong></TableCell>
                          <TableCell><strong>Эмч</strong></TableCell>
                          <TableCell><strong>Онош</strong></TableCell>
                          <TableCell><strong>Төлөв</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedPatient.examinationHistory.map((exam, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{exam.date || 'Тодорхойгүй'}</TableCell>
                            <TableCell>{exam.type || 'Тодорхойгүй'}</TableCell>
                            <TableCell>{exam.doctor || 'Тодорхойгүй'}</TableCell>
                            <TableCell>{exam.diagnosis || 'Тодорхойгүй'}</TableCell>
                            <TableCell>
                              {exam.status === 'Хийгдэж буй' ? (
                                <Box display="flex" alignItems="center" gap={1}>
                                  <HourglassEmptyIcon color="warning" />
                                  <Typography>Хийгдэж буй</Typography>
                                </Box>
                              ) : (
                                <Box display="flex" alignItems="center" gap={1}>
                                  <CheckCircleOutlineIcon color="success" />
                                  <Typography>Дууссан</Typography>
                                </Box>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography color="text.secondary">Үзлэгийн түүх олдсонгүй</Typography>
                )}
              </Box>
            )}
            
            {detailsTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Эмчилгээний түүх
                </Typography>
                {selectedPatient.medicalHistory.length > 0 ? (
                  <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell><strong>№</strong></TableCell>
                          <TableCell><strong>Огноо</strong></TableCell>
                          <TableCell><strong>Онош</strong></TableCell>
                          <TableCell><strong>Эмчилгээ</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedPatient.medicalHistory.map((history, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{history.date || 'Тодорхойгүй'}</TableCell>
                            <TableCell>{history.diagnosis || 'Тодорхойгүй'}</TableCell>
                            <TableCell>{history.treatment || 'Тодорхойгүй'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography color="text.secondary">Эмчилгээний түүх олдсонгүй</Typography>
                )}
              </Box>
            )}
            
            {detailsTab === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Өвчний түүх
                </Typography>
                {selectedPatient.medicalHistory.length > 0 ? (
                  <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell><strong>№</strong></TableCell>
                          <TableCell><strong>Огноо</strong></TableCell>
                          <TableCell><strong>Онош</strong></TableCell>
                          <TableCell><strong>Эмчилгээ</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedPatient.medicalHistory.map((history, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{history.date || 'Тодорхойгүй'}</TableCell>
                            <TableCell>{history.diagnosis || 'Тодорхойгүй'}</TableCell>
                            <TableCell>{history.treatment || 'Тодорхойгүй'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography color="text.secondary">Өвчний түүх олдсонгүй</Typography>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'white' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h4" fontWeight="600">Үзлэг оношилгоо</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Эрүүл биед саруул ухаан оршино.
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color="primary"
              onClick={addNewExamination}
              startIcon={<AddIcon />}
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none',
                px: 3
              }}
            >
              Шинэ үзлэг
            </Button>
          </Box>
          
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Нийт үзлэгүүд" />
            <Tab label="Хийгдэж буй үзлэг" />
            <Tab label="Анхан үзлэг" />
            <Tab label="Давтан үзлэг" />
          </Tabs>
        </Box>

        <Box sx={{ px: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Үр дүн: {filtered.length}</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Хэрэглэгч хайх"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
                }}
                sx={{ width: 240 }}
              />
            </Box>
          </Box>
        </Box>

        <TableContainer 
          component={Paper} 
          sx={{ 
            flexGrow: 1, 
            mx: 3, 
            boxShadow: 'none', 
            border: '1px solid #eee', 
            borderRadius: '12px' 
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Үзлэгийн өдөр</TableCell>
                <TableCell>Овог</TableCell>
                <TableCell>Нэр</TableCell>
                <TableCell>Үзлэгийн төрөл</TableCell>
                <TableCell>Онош</TableCell>
                <TableCell>Хийсэн ажилбар</TableCell>
                <TableCell>Төлөв</TableCell>
                <TableCell align="right">Үйлдлүүд</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((exam, idx) => (
                <TableRow 
                  key={exam.id}
                  sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                >
                  <TableCell>{(page - 1) * ITEMS_PER_PAGE + idx + 1}</TableCell>
                  <TableCell>{exam.date}</TableCell>
                  <TableCell>{exam.lastName}</TableCell>
                  <TableCell>{exam.firstName}</TableCell>
                  <TableCell>{exam.type}</TableCell>
                  <TableCell>{exam.diagnosis}</TableCell>
                  <TableCell>{exam.action}</TableCell>
                  <TableCell>
                    <Box 
                      sx={{ 
                        bgcolor: exam.status === 'Хийгдэж буй' ? 'info.100' : 'success.100',
                        color: exam.status === 'Хийгдэж буй' ? 'info.main' : 'success.main',
                        py: 0.5,
                        px: 1.5,
                        borderRadius: '4px',
                        display: 'inline-flex',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      {exam.status === 'Хийгдэж буй' ? (
                        <>
                          <HourglassEmptyIcon fontSize="small" sx={{ fontSize: '16px' }} />
                          {exam.status}
                        </>
                      ) : (
                        <>
                          <CheckCircleOutlineIcon fontSize="small" sx={{ fontSize: '16px' }} />
                          {exam.status}
                        </>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      onClick={(e) => handleMoreClick(e, exam)}
                      sx={{ 
                        color: 'text.secondary',
                        '&:hover': { 
                          bgcolor: 'rgba(0, 0, 0, 0.04)' 
                        }
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary"
            size="small" 
          />
        </Box>

        {/* Menu */}
        <Menu 
          anchorEl={anchorEl} 
          open={Boolean(anchorEl)} 
          onClose={handleCloseMenu}
          PaperProps={{
            sx: {
              boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.08)',
              borderRadius: '8px',
              minWidth: '180px'
            }
          }}
        >
          <MenuItem 
            onClick={handleViewDetails}
            sx={{ 
              gap: 1,
              py: 1,
              '&:hover': { 
                bgcolor: 'rgba(25, 118, 210, 0.08)' 
              }
            }}
          >
            <VisibilityOutlinedIcon fontSize="small" color="primary" />
            <Typography>Дэлгэрэнгүй харах</Typography>
          </MenuItem>
          <MenuItem 
            onClick={handleEdit}
            sx={{ 
              gap: 1,
              py: 1,
              '&:hover': { 
                bgcolor: 'rgba(25, 118, 210, 0.08)' 
              }
            }}
          >
            <EditOutlinedIcon fontSize="small" color="primary" />
            <Typography>Засах</Typography>
          </MenuItem>
          <MenuItem 
            onClick={handleDelete}
            sx={{ 
              gap: 1,
              py: 1,
              '&:hover': { 
                bgcolor: 'rgba(211, 47, 47, 0.08)' 
              }
            }}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" color="error" />
            <Typography color="error.main">Устгах</Typography>
          </MenuItem>
        </Menu>
        
        {/* Edit Dialog */}
        <Dialog 
          open={openEditDialog} 
          onClose={() => setOpenEditDialog(false)} 
          fullWidth 
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: '12px',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)'
            }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            pb: 1
          }}>
            <Box component="div">
              <Typography variant="h6" component="span" fontWeight={600}>
                Үзлэгийн мэдээлэл засах
              </Typography>
            </Box>
            <IconButton 
              size="small" 
              onClick={() => setOpenEditDialog(false)}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          
          <Divider />
          
          <DialogContent sx={{ pt: 3 }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Үзлэгийн өдөр"
                  name="date"
                  type="date"
                  value={editFormData.date}
                  onChange={handleEditChange}
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl fullWidth>
                  <InputLabel id="type-label">Үзлэгийн төрөл</InputLabel>
                  <Select
                    labelId="type-label"
                    name="type"
                    value={editFormData.type}
                    onChange={handleEditChange}
                    label="Үзлэгийн төрөл"
                  >
                    <MenuItem value="Анхан">Анхан</MenuItem>
                    <MenuItem value="Давтан">Давтан</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Төлөв</InputLabel>
                  <Select
                    labelId="status-label"
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditChange}
                    label="Төлөв"
                  >
                    <MenuItem value="Хийгдэж буй">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HourglassEmptyIcon fontSize="small" />
                        <Typography>Хийгдэж буй</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="Дууссан">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleOutlineIcon fontSize="small" />
                        <Typography>Дууссан</Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Овог"
                  name="lastName"
                  value={editFormData.lastName}
                  onChange={handleEditChange}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="Нэр"
                  name="firstName"
                  value={editFormData.firstName}
                  onChange={handleEditChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              
              <TextField
                fullWidth
                label="Онош"
                name="diagnosis"
                value={editFormData.diagnosis}
                onChange={handleEditChange}
                InputLabelProps={{ shrink: true }}
              />
              
              <TextField
                fullWidth
                label="Хийсэн ажилбар"
                name="action"
                value={editFormData.action}
                onChange={handleEditChange}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
          </DialogContent>
          
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button 
              onClick={() => setOpenEditDialog(false)}