'use client';

import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Pagination, Tabs, Tab, Menu, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Divider, FormControl, InputLabel, Select, Stack,
  Card, CardContent, Grid
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
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import HistoryIcon from '@mui/icons-material/History';
import { useRouter } from 'next/navigation';

const initialExaminations = [
  {
    id: 1,
    date: '2023-05-09',
    lastName: 'Нямжав',
    firstName: 'Наранчимэг',
    type: 'Анхан',
    diagnosis: 'A01.1 - A ижбанадад',
    action: 'Z-40',
    status: 'Дууссан'
  },
  // ... other examination data
];

const initialTreatments = [
  {
    id: 1,
    date: '2023-05-10',
    name: 'Амоксициллин',
    dosage: '500mg',
    frequency: 'Өдөрт 3 удаа',
    duration: '7 хоног',
    prescribedBy: 'Э.Бат-Эрдэнэ'
  },
  // ... other treatment data
];

const initialVitals = [
  {
    id: 1,
    date: '2023-05-09',
    bloodPressure: '120/80',
    heartRate: '72',
    temperature: '36.6',
    weight: '68',
    height: '175'
  },
  // ... other vital signs data
];

const initialMedicalHistory = [
  {
    id: 1,
    date: '2022-03-15',
    condition: 'Ханиад',
    severity: 'Дунд зэрэг',
    treatment: 'Амоксициллин, 5 хоног'
  },
  // ... other medical history data
];

export default function PatientDetailPage() {
  const [examinations, setExaminations] = useState(initialExaminations);
  const [treatments, setTreatments] = useState(initialTreatments);
  const [vitals, setVitals] = useState(initialVitals);
  const [medicalHistory, setMedicalHistory] = useState(initialMedicalHistory);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();
  
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  
  const ITEMS_PER_PAGE = 4;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1);
  };

  const handleMoreClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  
  const handleEdit = () => {
    setEditFormData({ ...selectedItem });
    setOpenEditDialog(true);
    handleCloseMenu();
  };
  
  const handleDelete = () => {
    setOpenDeleteConfirm(true);
    handleCloseMenu();
  };
  
  const handleViewDetails = () => {
    router.push(`/records/${selectedItem?.id}`);
    handleCloseMenu();
  };
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const saveEdit = () => {
    // Update the appropriate state based on which tab is active
    if (tabValue === 0) {
      setExaminations(prev => prev.map(item => item.id === editFormData.id ? editFormData : item));
    } else if (tabValue === 1) {
      setTreatments(prev => prev.map(item => item.id === editFormData.id ? editFormData : item));
    } else if (tabValue === 2) {
      setVitals(prev => prev.map(item => item.id === editFormData.id ? editFormData : item));
    } else if (tabValue === 3) {
      setMedicalHistory(prev => prev.map(item => item.id === editFormData.id ? editFormData : item));
    }
    setOpenEditDialog(false);
  };
  
  const confirmDelete = () => {
    // Delete from the appropriate state based on which tab is active
    if (tabValue === 0) {
      setExaminations(prev => prev.filter(item => item.id !== selectedItem.id));
    } else if (tabValue === 1) {
      setTreatments(prev => prev.filter(item => item.id !== selectedItem.id));
    } else if (tabValue === 2) {
      setVitals(prev => prev.filter(item => item.id !== selectedItem.id));
    } else if (tabValue === 3) {
      setMedicalHistory(prev => prev.filter(item => item.id !== selectedItem.id));
    }
    setOpenDeleteConfirm(false);
  };
  
  const cancelDelete = () => {
    setOpenDeleteConfirm(false);
  };
  
  const addNewRecord = () => {
    if (tabValue === 0) {
      router.push('/examination/new');
    } else if (tabValue === 1) {
      router.push('/treatment/new');
    } else if (tabValue === 2) {
      router.push('/vitals/new');
    } else if (tabValue === 3) {
      router.push('/history/new');
    }
  };

  const filtered = (() => {
    let data = [];
    if (tabValue === 0) data = examinations;
    else if (tabValue === 1) data = treatments;
    else if (tabValue === 2) data = vitals;
    else if (tabValue === 3) data = medicalHistory;
    
    return data.filter(item => 
      (item.firstName?.toLowerCase().includes(search.toLowerCase()) || 
       item.lastName?.toLowerCase().includes(search.toLowerCase()) ||
       item.name?.toLowerCase().includes(search.toLowerCase()) ||
       item.diagnosis?.toLowerCase().includes(search.toLowerCase()) ||
       item.condition?.toLowerCase().includes(search.toLowerCase()))
    );
  })();

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const renderTable = () => {
    switch (tabValue) {
      case 0: // Examinations
        return (
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
                <TableRow key={exam.id} hover>
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
                    <IconButton onClick={(e) => handleMoreClick(e, exam)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 1: // Treatments
        return (
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Огноо</TableCell>
                <TableCell>Эмийн нэр</TableCell>
                <TableCell>Тун</TableCell>
                <TableCell>Давтамж</TableCell>
                <TableCell>Хугацаа</TableCell>
                <TableCell>Эмчилгээ зохиогч</TableCell>
                <TableCell align="right">Үйлдлүүд</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((treatment, idx) => (
                <TableRow key={treatment.id} hover>
                  <TableCell>{(page - 1) * ITEMS_PER_PAGE + idx + 1}</TableCell>
                  <TableCell>{treatment.date}</TableCell>
                  <TableCell>{treatment.name}</TableCell>
                  <TableCell>{treatment.dosage}</TableCell>
                  <TableCell>{treatment.frequency}</TableCell>
                  <TableCell>{treatment.duration}</TableCell>
                  <TableCell>{treatment.prescribedBy}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleMoreClick(e, treatment)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 2: // Vital Signs
        return (
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Огноо</TableCell>
                <TableCell>Цусны даралт</TableCell>
                <TableCell>Зүрхний цохилт</TableCell>
                <TableCell>Биеийн хэм</TableCell>
                <TableCell>Жин (кг)</TableCell>
                <TableCell>Өндөр (см)</TableCell>
                <TableCell align="right">Үйлдлүүд</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((vital, idx) => (
                <TableRow key={vital.id} hover>
                  <TableCell>{(page - 1) * ITEMS_PER_PAGE + idx + 1}</TableCell>
                  <TableCell>{vital.date}</TableCell>
                  <TableCell>{vital.bloodPressure}</TableCell>
                  <TableCell>{vital.heartRate}</TableCell>
                  <TableCell>{vital.temperature}</TableCell>
                  <TableCell>{vital.weight}</TableCell>
                  <TableCell>{vital.height}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleMoreClick(e, vital)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 3: // Medical History
        return (
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Огноо</TableCell>
                <TableCell>Өвчний нэр</TableCell>
                <TableCell>Хүндрэлийн зэрэг</TableCell>
                <TableCell>Эмчилгээ</TableCell>
                <TableCell align="right">Үйлдлүүд</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((history, idx) => (
                <TableRow key={history.id} hover>
                  <TableCell>{(page - 1) * ITEMS_PER_PAGE + idx + 1}</TableCell>
                  <TableCell>{history.date}</TableCell>
                  <TableCell>{history.condition}</TableCell>
                  <TableCell>{history.severity}</TableCell>
                  <TableCell>{history.treatment}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleMoreClick(e, history)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      default:
        return null;
    }
  };

  const renderEditForm = () => {
    switch (tabValue) {
      case 0: // Examinations
        return (
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Үзлэгийн өдөр"
                name="date"
                type="date"
                value={editFormData.date || ''}
                onChange={handleEditChange}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth>
                <InputLabel>Үзлэгийн төрөл</InputLabel>
                <Select
                  name="type"
                  value={editFormData.type || ''}
                  onChange={handleEditChange}
                  label="Үзлэгийн төрөл"
                >
                  <MenuItem value="Анхан">Анхан</MenuItem>
                  <MenuItem value="Давтан">Давтан</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Төлөв</InputLabel>
                <Select
                  name="status"
                  value={editFormData.status || ''}
                  onChange={handleEditChange}
                  label="Төлөв"
                >
                  <MenuItem value="Хийгдэж буй">Хийгдэж буй</MenuItem>
                  <MenuItem value="Дууссан">Дууссан</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Овог"
                name="lastName"
                value={editFormData.lastName || ''}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                label="Нэр"
                name="firstName"
                value={editFormData.firstName || ''}
                onChange={handleEditChange}
              />
            </Box>
            
            <TextField
              fullWidth
              label="Онош"
              name="diagnosis"
              value={editFormData.diagnosis || ''}
              onChange={handleEditChange}
            />
            
            <TextField
              fullWidth
              label="Хийсэн ажилбар"
              name="action"
              value={editFormData.action || ''}
              onChange={handleEditChange}
            />
          </Stack>
        );
      case 1: // Treatments
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Огноо"
              name="date"
              type="date"
              value={editFormData.date || ''}
              onChange={handleEditChange}
              InputLabelProps={{ shrink: true }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Эмийн нэр"
                name="name"
                value={editFormData.name || ''}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                label="Тун"
                name="dosage"
                value={editFormData.dosage || ''}
                onChange={handleEditChange}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Давтамж"
                name="frequency"
                value={editFormData.frequency || ''}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                label="Хугацаа"
                name="duration"
                value={editFormData.duration || ''}
                onChange={handleEditChange}
              />
            </Box>
            <TextField
              fullWidth
              label="Эмчилгээ зохиогч"
              name="prescribedBy"
              value={editFormData.prescribedBy || ''}
              onChange={handleEditChange}
            />
          </Stack>
        );
      case 2: // Vital Signs
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Огноо"
              name="date"
              type="date"
              value={editFormData.date || ''}
              onChange={handleEditChange}
              InputLabelProps={{ shrink: true }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Цусны даралт"
                name="bloodPressure"
                value={editFormData.bloodPressure || ''}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                label="Зүрхний цохилт"
                name="heartRate"
                value={editFormData.heartRate || ''}
                onChange={handleEditChange}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Биеийн хэм"
                name="temperature"
                value={editFormData.temperature || ''}
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                label="Жин (кг)"
                name="weight"
                value={editFormData.weight || ''}
                onChange={handleEditChange}
              />
            </Box>
            <TextField
              fullWidth
              label="Өндөр (см)"
              name="height"
              value={editFormData.height || ''}
              onChange={handleEditChange}
            />
          </Stack>
        );
      case 3: // Medical History
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Огноо"
              name="date"
              type="date"
              value={editFormData.date || ''}
              onChange={handleEditChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Өвчний нэр"
              name="condition"
              value={editFormData.condition || ''}
              onChange={handleEditChange}
            />
            <FormControl fullWidth>
              <InputLabel>Хүндрэлийн зэрэг</InputLabel>
              <Select
                name="severity"
                value={editFormData.severity || ''}
                onChange={handleEditChange}
                label="Хүндрэлийн зэрэг"
              >
                <MenuItem value="Хөнгөн">Хөнгөн</MenuItem>
                <MenuItem value="Дунд зэрэг">Дунд зэрэг</MenuItem>
                <MenuItem value="Хүнд">Хүнд</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Эмчилгээ"
              name="treatment"
              value={editFormData.treatment || ''}
              onChange={handleEditChange}
              multiline
              rows={3}
            />
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'white' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h4" fontWeight="600">Хэрэглэгчийн эрүүл мэндийн бүртгэл</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Бүх эрүүл мэндийн мэдээллийг нэг дороос харах боломжтой.
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color="primary"
              onClick={addNewRecord}
              startIcon={<AddIcon />}
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none',
                px: 3
              }}
            >
              Шинэ бүртгэл
            </Button>
          </Box>
          
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Үзлэг" icon={<VisibilityOutlinedIcon fontSize="small" />} />
            <Tab label="Эмчилгээ" icon={<MedicalServicesIcon fontSize="small" />} />
            <Tab label="Амин үзүүлэлт" icon={<MonitorHeartIcon fontSize="small" />} />
            <Tab label="Өвчний түүх" icon={<HistoryIcon fontSize="small" />} />
          </Tabs>
        </Box>

        <Box sx={{ px: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Үр дүн: {filtered.length}</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Хайх"
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
          {renderTable()}
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

        {/* Context Menu */}
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
          <MenuItem onClick={handleViewDetails} sx={{ gap: 1, py: 1 }}>
            <VisibilityOutlinedIcon fontSize="small" color="primary" />
            <Typography>Дэлгэрэнгүй</Typography>
          </MenuItem>
          <MenuItem onClick={handleEdit} sx={{ gap: 1, py: 1 }}>
            <EditOutlinedIcon fontSize="small" color="primary" />
            <Typography>Засах</Typography>
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ gap: 1, py: 1 }}>
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
            <Typography variant="h6" fontWeight={600}>
              {tabValue === 0 && 'Үзлэгийн мэдээлэл засах'}
              {tabValue === 1 && 'Эмчилгээний мэдээлэл засах'}
              {tabValue === 2 && 'Амин үзүүлэлт засах'}
              {tabValue === 3 && 'Өвчний түүх засах'}
            </Typography>
            <IconButton onClick={() => setOpenEditDialog(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          
          <Divider />
          
          <DialogContent sx={{ pt: 3 }}>
            {renderEditForm()}
          </DialogContent>
          
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button 
              onClick={() => setOpenEditDialog(false)}
              variant="outlined"
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none',
                px: 3
              }}
            >
              Болих
            </Button>
            <Button 
              variant="contained" 
              onClick={saveEdit}
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none',
                px: 3
              }}
            >
              Хадгалах
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Delete Confirm Dialog */}
        <Dialog 
          open={openDeleteConfirm} 
          onClose={cancelDelete}
          PaperProps={{
            sx: {
              borderRadius: '12px',
              width: '400px',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)'
            }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DeleteOutlineOutlinedIcon color="error" />
              <Typography variant="h6" component="span" fontWeight={600} color="error.main">
                Устгах уу?
              </Typography>
            </Box>
            <IconButton onClick={cancelDelete}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          
          <Divider />
          
          <DialogContent sx={{ py: 3 }}>
            <Typography align="center">
              Та энэ бүртгэлийг устгахдаа итгэлтэй байна уу?
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              Энэ үйлдлийг буцаах боломжгүй.
            </Typography>
          </DialogContent>
          
          <DialogActions sx={{ px: 3, py: 2, justifyContent: 'center' }}>
            <Button 
              onClick={cancelDelete}
              variant="outlined"
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none',
                px: 3,
                minWidth: '120px'
              }}
            >
              Болих
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={confirmDelete}
              startIcon={<DeleteOutlineOutlinedIcon />}
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none',
                px: 3,
                minWidth: '120px'
              }}
            >
              Устгах
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}