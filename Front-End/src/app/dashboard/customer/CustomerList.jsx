'use client';

import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Pagination,
  TextField,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Stack
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';

// Sample data with extended medical information
const initialCustomers = [
  {
    id: 1,
    name: 'Батбаяр Ариунболд',
    birthDate: '2001/07/06',
    age: 23,
    type: 'Оюутан',
    address: 'УБ, 3-р хороо, Даваа салбар, ...',
    phone: '9921 8857',
    healthIndicators: {
      bloodPressure: '120/80',
      heartRate: '72 bpm',
      temperature: '36.6°C',
      bloodType: 'A+',
      allergies: ['Нэгэн төрлийн хоолны хордлого', 'Зарим эмийн бодис'],
      chronicConditions: ['Харшил']
    },
    examinations: [
      {
        date: '2023/05/15',
        doctor: 'Доктор Цэцэгмаа',
        diagnosis: 'Ханиад',
        notes: '3 хоног амралт авч, эм уух'
      },
      {
        date: '2023/10/22',
        doctor: 'Доктор Бат',
        diagnosis: 'Гэдэсний хордлого',
        notes: '2 хоногийн хоолны дэглэм'
      }
    ],
    treatments: [
      {
        date: '2023/05/15',
        treatment: 'Ханиадны эм',
        duration: '5 хоног',
        doctor: 'Доктор Цэцэгмаа'
      },
      {
        date: '2023/10/22',
        treatment: 'Антибиотик',
        duration: '7 хоног',
        doctor: 'Доктор Бат'
      }
    ],
    medicalHistory: [
      {
        year: '2020',
        event: 'Ходоодны өвчин',
        hospital: 'Улаанбаатар Эрүүл Мэндийн Төв'
      },
      {
        year: '2018',
        event: 'Гэмтэл',
        hospital: 'ШУТИС-ийн Эрүүл Мэндийн Төв'
      }
    ]
  },
  {
    id: 2,
    name: 'Нямсүрэн Зоригоо',
    birthDate: '2001/07/06',
    age: 23,
    type: 'Оюутан',
    address: 'Дархан, Хороолол, Гудамж, Байр, ...',
    phone: '8015 8665',
    healthIndicators: {
      bloodPressure: '110/70',
      heartRate: '68 bpm',
      temperature: '36.4°C',
      bloodType: 'B+',
      allergies: [],
      chronicConditions: []
    },
    examinations: [
      {
        date: '2023/06/10',
        doctor: 'Доктор Сүхбаатар',
        diagnosis: 'Толгой өвдөлт',
        notes: 'Стрессээс үүдэлтэй'
      }
    ],
    treatments: [
      {
        date: '2023/06/10',
        treatment: 'Толгой өвдөлтийн эм',
        duration: 'Шаардлагатай үед',
        doctor: 'Доктор Сүхбаатар'
      }
    ],
    medicalHistory: []
  },
  // ... (other customers with similar extended data)
];

export default function CustomerList() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const ITEMS_PER_PAGE = 6;
  
  const [customers, setCustomers] = useState(initialCustomers);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  
  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    birthDate: '',
    age: '',
    type: '',
    address: '',
    phone: '',
  });

  // Switch tabs
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1);
  };

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Filter data
  const filteredCustomers = customers.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (tabValue === 0) return true;
    if (tabValue === 1) return item.type === 'Оюутан';
    if (tabValue === 2) return item.type === 'Багш';
    if (tabValue === 3) return item.type === 'Ажилтан';
    return true;
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

  // Get current page data
  const currentPageData = filteredCustomers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Navigation handlers
  const handleAddCustomer = () => {
    router.push('/customer/register');
  };
  
  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setOpenDetailDialog(true);
  };
  
  // Menu handlers
  const handleMoreClick = (event, customer) => {
    setAnchorEl(event.currentTarget);
    setSelectedCustomer(customer);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  
  const handleEdit = () => {
    setEditFormData({ ...selectedCustomer });
    setOpenEditDialog(true);
    handleCloseMenu();
  };
  
  const handleDelete = () => {
    setOpenDeleteConfirm(true);
    handleCloseMenu();
  };
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const saveEdit = () => {
    setCustomers((prev) =>
      prev.map((cust) =>
        cust.id === editFormData.id ? { ...editFormData } : cust
      )
    );
    setOpenEditDialog(false);
  };
  
  const confirmDelete = () => {
    setCustomers((prev) => prev.filter((cust) => cust.id !== selectedCustomer.id));
    setOpenDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setOpenDeleteConfirm(false);
  };
  
  const getNameParts = (fullName) => {
    const parts = fullName.split(' ');
    if (parts.length === 2) {
      return { lastName: parts[0], firstName: parts[1] };
    } else if (parts.length > 2) {
      return { lastName: parts[0], firstName: parts.slice(1).join(' ') };
    }
    return { lastName: '', firstName: fullName };
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'white' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
        {/* Header and search */}
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h4" fontWeight="600">Үйлчлүүлэгч</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Бүх үйлчлүүлэгчийн дэлгэрэнгүй мэдээллийг жагсаалт
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Хайх"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                }}
                sx={{ width: 250 }}
              />
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleAddCustomer}
                sx={{ borderRadius: '8px', textTransform: 'none' }}
              >
                Нэмэх
              </Button>
            </Box>
          </Box>
          
          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Бүх үйлчлүүлэгч" />
            <Tab label="Оюутан" />
            <Tab label="Багш" />
            <Tab label="Ажилтан" />
          </Tabs>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ 
          flexGrow: 1, 
          mx: 3, 
          boxShadow: 'none', 
          border: '1px solid #eee',
          borderRadius: '12px'
        }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Нэр</strong></TableCell>
                <TableCell><strong>Төрсөн огноо</strong></TableCell>
                <TableCell><strong>Нас</strong></TableCell>
                <TableCell><strong>Төрөл</strong></TableCell>
                <TableCell><strong>Хаяг</strong></TableCell>
                <TableCell><strong>Утас</strong></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageData.map((item) => {
                const { lastName, firstName } = getNameParts(item.name);
                return (
                  <TableRow 
                    key={item.id}
                    hover
                    sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            mr: 2, 
                            width: 36, 
                            height: 36, 
                            bgcolor: 'primary.main',
                            fontSize: '14px',
                            fontWeight: 'medium'
                          }}
                        >
                          {item.name.charAt(0)}
                        </Avatar>
                        {item.name}
                      </Box>
                    </TableCell>
                    <TableCell>{item.birthDate}</TableCell>
                    <TableCell>{item.age}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell align="right">
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleMoreClick(e, item)}
                        sx={{ 
                          color: 'text.secondary',
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
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
              minWidth: '160px'
            }
          }}
        >
          <MenuItem 
            onClick={() => {
              handleViewDetails(selectedCustomer);
              handleCloseMenu();
            }}
            sx={{ 
              gap: 1,
              py: 1,
              '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.08)' }
            }}
          >
            <VisibilityOutlinedIcon fontSize="small" color="info" />
            <Typography>Дэлгэрэнгүй</Typography>
          </MenuItem>
          <MenuItem 
            onClick={handleEdit}
            sx={{ 
              gap: 1,
              py: 1,
              '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.08)' }
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
              '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.08)' }
            }}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" color="error" />
            <Typography color="error.main">Устгах</Typography>
          </MenuItem>
        </Menu>
        
        {/* Customer Detail Dialog */}
        <Dialog 
          open={openDetailDialog} 
          onClose={() => setOpenDetailDialog(false)} 
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
            <Typography variant="h6" component="span" fontWeight={600}>
              {selectedCustomer?.name} - Үйлчлүүлэгчийн дэлгэрэнгүй
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => setOpenDetailDialog(false)}
              sx={{ '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          
          <Divider />
          
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Үндсэн мэдээлэл
              </Typography>
              <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">Төрсөн огноо</Typography>
                  <Typography>{selectedCustomer?.birthDate}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">Нас</Typography>
                  <Typography>{selectedCustomer?.age}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">Төрөл</Typography>
                  <Typography>{selectedCustomer?.type}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 4 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">Хаяг</Typography>
                  <Typography>{selectedCustomer?.address}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">Утас</Typography>
                  <Typography>{selectedCustomer?.phone}</Typography>
                </Box>
              </Box>
            </Box>
            
            {/* Health Indicators */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Эрүүл мэндийн үзүүлэлт
              </Typography>
              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: '200px' }}>
                  <Typography variant="body2" color="text.secondary">Цусны даралт</Typography>
                  <Typography>{selectedCustomer?.healthIndicators?.bloodPressure || '-'}</Typography>
                </Box>
                <Box sx={{ flex: 1, minWidth: '200px' }}>
                  <Typography variant="body2" color="text.secondary">Зүрхний цохилт</Typography>
                  <Typography>{selectedCustomer?.healthIndicators?.heartRate || '-'}</Typography>
                </Box>
                <Box sx={{ flex: 1, minWidth: '200px' }}>
                  <Typography variant="body2" color="text.secondary">Биеийн хэм</Typography>
                  <Typography>{selectedCustomer?.healthIndicators?.temperature || '-'}</Typography>
                </Box>
                <Box sx={{ flex: 1, minWidth: '200px' }}>
                  <Typography variant="body2" color="text.secondary">Цусны бүлэг</Typography>
                  <Typography>{selectedCustomer?.healthIndicators?.bloodType || '-'}</Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">Харшил</Typography>
                <Typography>
                  {selectedCustomer?.healthIndicators?.allergies?.join(', ') || 'Харшил байхгүй'}
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">Архаг өвчин</Typography>
                <Typography>
                  {selectedCustomer?.healthIndicators?.chronicConditions?.join(', ') || 'Архаг өвчин байхгүй'}
                </Typography>
              </Box>
            </Box>
            
            {/* Examinations */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Үзлэгийн түүх
              </Typography>
              {selectedCustomer?.examinations?.length > 0 ? (
                <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #eee' }}>
                  <Table size="small">
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell><strong>Огноо</strong></TableCell>
                        <TableCell><strong>Эмч</strong></TableCell>
                        <TableCell><strong>Онош</strong></TableCell>
                        <TableCell><strong>Тэмдэглэл</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedCustomer?.examinations?.map((exam, index) => (
                        <TableRow key={index}>
                          <TableCell>{exam.date}</TableCell>
                          <TableCell>{exam.doctor}</TableCell>
                          <TableCell>{exam.diagnosis}</TableCell>
                          <TableCell>{exam.notes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" color="text.secondary">Үзлэгийн түүх байхгүй</Typography>
              )}
            </Box>
            
            {/* Treatments */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Эмчилгээний түүх
              </Typography>
              {selectedCustomer?.treatments?.length > 0 ? (
                <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #eee' }}>
                  <Table size="small">
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell><strong>Огноо</strong></TableCell>
                        <TableCell><strong>Эмчилгээ</strong></TableCell>
                        <TableCell><strong>Хугацаа</strong></TableCell>
                        <TableCell><strong>Эмч</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedCustomer?.treatments?.map((treatment, index) => (
                        <TableRow key={index}>
                          <TableCell>{treatment.date}</TableCell>
                          <TableCell>{treatment.treatment}</TableCell>
                          <TableCell>{treatment.duration}</TableCell>
                          <TableCell>{treatment.doctor}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" color="text.secondary">Эмчилгээний түүх байхгүй</Typography>
              )}
            </Box>
            
            {/* Medical History */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Өвчний түүх
              </Typography>
              {selectedCustomer?.medicalHistory?.length > 0 ? (
                <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #eee' }}>
                  <Table size="small">
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell><strong>Он</strong></TableCell>
                        <TableCell><strong>Үйл явдал</strong></TableCell>
                        <TableCell><strong>Эмнэлэг</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedCustomer?.medicalHistory?.map((history, index) => (
                        <TableRow key={index}>
                          <TableCell>{history.year}</TableCell>
                          <TableCell>{history.event}</TableCell>
                          <TableCell>{history.hospital}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" color="text.secondary">Өвчний түүх байхгүй</Typography>
              )}
            </Box>
          </DialogContent>
          
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button 
              onClick={() => setOpenDetailDialog(false)}
              variant="outlined"
              sx={{ borderRadius: '8px', textTransform: 'none', px: 3 }}
            >
              Хаах
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Edit Dialog */}
        <Dialog 
          open={openEditDialog} 
          onClose={() => setOpenEditDialog(false)} 
          fullWidth 
          maxWidth="sm"
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
            <Typography variant="h6" component="span" fontWeight={600}>
              Үйлчлүүлэгчийн мэдээлэл засах
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => setOpenEditDialog(false)}
              sx={{ '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          
          <Divider />
          
          <DialogContent sx={{ pt: 3 }}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Нэр"
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              
              <TextField
                fullWidth
                label="Төрсөн огноо"
                name="birthDate"
                value={editFormData.birthDate}
                onChange={handleEditChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              
              <TextField
                fullWidth
                label="Нас"
                name="age"
                value={editFormData.age}
                onChange={handleEditChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                type="number"
              />
              
              <FormControl fullWidth>
                <InputLabel id="type-label">Төрөл</InputLabel>
                <Select
                  labelId="type-label"
                  name="type"
                  value={editFormData.type}
                  onChange={handleEditChange}
                  label="Төрөл"
                >
                  <MenuItem value="Оюутан">Оюутан</MenuItem>
                  <MenuItem value="Багш">Багш</MenuItem>
                  <MenuItem value="Ажилтан">Ажилтан</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                label="Хаяг"
                name="address"
                value={editFormData.address}
                onChange={handleEditChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              
              <TextField
                fullWidth
                label="Утас"
                name="phone"
                value={editFormData.phone}
                onChange={handleEditChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
          </DialogContent>
          
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button 
              onClick={() => setOpenEditDialog(false)}
              variant="outlined"
              sx={{ borderRadius: '8px', textTransform: 'none', px: 3 }}
            >
              Болих
            </Button>
            <Button 
              variant="contained" 
              onClick={saveEdit}
              sx={{ borderRadius: '8px', textTransform: 'none', px: 3 }}
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
            <IconButton 
              size="small" 
              onClick={cancelDelete}
              sx={{ '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          
          <Divider />
          
          <DialogContent sx={{ py: 3 }}>
            <Typography align="center">
              Та <b>{selectedCustomer?.name}</b> үйлчлүүлэгчийг устгахдаа итгэлтэй байна уу?
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              Энэ үйлдлийг буцаах боломжгүй.
            </Typography>
          </DialogContent>
          
          <DialogActions sx={{ px: 3, py: 2, justifyContent: 'center' }}>
            <Button 
              onClick={cancelDelete}
              variant="outlined"
              sx={{ borderRadius: '8px', textTransform: 'none', px: 3, minWidth: '120px' }}
            >
              Болих
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={confirmDelete}
              startIcon={<DeleteOutlineOutlinedIcon />}
              sx={{ borderRadius: '8px', textTransform: 'none', px: 3, minWidth: '120px' }}
            >
              Устгах
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}