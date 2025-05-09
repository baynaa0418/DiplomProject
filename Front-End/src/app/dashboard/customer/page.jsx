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
  Stack,
  Grid,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';

// Sample data
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
      heartRate: '72',
      temperature: '36.6',
      weight: '68',
      height: '175'
    },
    examinations: [
      { date: '2023/05/15', doctor: 'Д. Эрдэнэбат', diagnosis: 'Ханиад', notes: '3 хоног амралт' },
      { date: '2023/10/22', doctor: 'Ц. Мөнхбат', diagnosis: 'Толгой өвдөлт', notes: 'Эмчилгээний курс' }
    ],
    treatments: [
      { date: '2023/05/15', treatment: 'Антибиотик', duration: '7 хоног' },
      { date: '2023/10/22', treatment: 'Толгойны өвдөлтийн эм', duration: '3 хоног' }
    ],
    medicalHistory: [
      { year: '2020', description: 'Сэтэлгээний үзлэг' },
      { year: '2021', description: 'Гэдэсний халдвар' }
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
      bloodPressure: '110/75',
      heartRate: '68',
      temperature: '36.4',
      weight: '72',
      height: '180'
    },
    examinations: [
      { date: '2023/06/20', doctor: 'Б. Энхтуяа', diagnosis: 'Ходоодны өвчин', notes: 'Яаралтай үзлэг' }
    ],
    treatments: [
      { date: '2023/06/20', treatment: 'Ходоодны эм', duration: '10 хоног' }
    ],
    medicalHistory: [
      { year: '2019', description: 'Сэтэлгээний үзлэг' },
      { year: '2022', description: 'Харшлын шинжилгээ' }
    ]
  },
  {
    id: 3,
    name: 'Батбаяр Ганжигүүр',
    birthDate: '2001/07/06',
    age: 23,
    type: 'Оюутан',
    address: 'УБ, 5-р хороо, Байр, Тоот',
    phone: '9911 1234',
    healthIndicators: {
      bloodPressure: '130/85',
      heartRate: '75',
      temperature: '36.8',
      weight: '80',
      height: '178'
    },
    examinations: [
      { date: '2023/08/12', doctor: 'Ц. Мөнхбат', diagnosis: 'Биеийн хэвийн үзлэг', notes: 'Жил бүрийн үзлэг' }
    ],
    treatments: [],
    medicalHistory: [
      { year: '2020', description: 'Цусны шинжилгээ' },
      { year: '2021', description: 'Даралт ихсэлт' }
    ]
  },
  {
    id: 4,
    name: 'Батмэнд Мөнххүлэг',
    birthDate: '2001/07/06',
    age: 23,
    type: 'Багш',
    address: 'Дархан, Хороолол, Гудамж, Байр, Тоот',
    phone: '8888 8001',
    healthIndicators: {
      bloodPressure: '125/82',
      heartRate: '70',
      temperature: '36.5',
      weight: '75',
      height: '172'
    },
    examinations: [
      { date: '2023/09/05', doctor: 'Д. Эрдэнэбат', diagnosis: 'Нүдний шинжилгээ', notes: 'Дараагийн үзлэг 6 сарын дараа' }
    ],
    treatments: [
      { date: '2023/09/05', treatment: 'Нүдний дусал', duration: '30 хоног' }
    ],
    medicalHistory: [
      { year: '2018', description: 'Нүдний мэдрэл сулрах' },
      { year: '2022', description: 'Цусны даралт ихсэлт' }
    ]
  },
  {
    id: 5,
    name: 'Лувсандорж Ганбаатар',
    birthDate: '2001/07/06',
    age: 23,
    type: 'Ажилтан',
    address: 'Дархан, Хороолол, Гудамж, Байр, Тоот',
    phone: '8088 8001',
    healthIndicators: {
      bloodPressure: '118/78',
      heartRate: '65',
      temperature: '36.7',
      weight: '70',
      height: '176'
    },
    examinations: [
      { date: '2023/07/18', doctor: 'Б. Энхтуяа', diagnosis: 'Биеийн хэвийн үзлэг', notes: 'Жил бүрийн үзлэг' }
    ],
    treatments: [],
    medicalHistory: [
      { year: '2019', description: 'Цусны шинжилгээ' },
      { year: '2021', description: 'Харшлын шинжилгээ' }
    ]
  },
];

export default function Customer() {
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
  const [openDetailView, setOpenDetailView] = useState(false);
  const [detailViewData, setDetailViewData] = useState(null);
  
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
    setPage(1); // Reset to first page when changing tabs
  };

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Filter data based on the selected tab
  const filteredCustomers = customers.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (tabValue === 0) return true; // All customers
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

  // Navigate to /customerRegister
  const handleAddCustomer = () => {
    router.push('/customer/customerRegister');
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
  
  const handleViewDetails = (customer) => {
    router.push(`/dashboard/customer/customerDetailView/${customer.id}`);
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
      {/* Content area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          {/* Title and search */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h4" fontWeight="600">Үйлчлүүлэгч</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">Бүх үйлчлүүлэгчийн дэлгэрэнгүй мэдээллийг жагсаалт</Typography>
              </Box>
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
                color="primary" 
                startIcon={<AddIcon />}
                onClick={handleAddCustomer}
                sx={{ 
                  borderRadius: '8px', 
                  textTransform: 'none' 
                }}
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
                          '&:hover': { 
                            bgcolor: 'rgba(0, 0, 0, 0.04)' 
                          }
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
              router.push(`/customer/${selectedCustomer.id}`);
              handleCloseMenu();
            }}
            sx={{ 
              gap: 1,
              py: 1,
              '&:hover': { 
                bgcolor: 'rgba(25, 118, 210, 0.08)' 
              }
            }}
          >
            <VisibilityOutlinedIcon fontSize="small" color="info" />
            <Typography>Дэлгэрэнгүй харах</Typography>
          </MenuItem>
          <MenuItem 
            onClick={() => {
              router.push(`/examination/newExamination?customerId=${selectedCustomer.id}&customerName=${encodeURIComponent(selectedCustomer.name)}&customerType=${encodeURIComponent(selectedCustomer.type)}&customerPhone=${encodeURIComponent(selectedCustomer.phone)}`);
              handleCloseMenu();
            }}
            sx={{ 
              gap: 1,
              py: 1,
              '&:hover': { 
                bgcolor: 'rgba(25, 118, 210, 0.08)' 
              }
            }}
          >
            <VisibilityOutlinedIcon fontSize="small" color="info" />
            <Typography>Үзлэг хийх</Typography>
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
            <Box component="div">
              <Typography variant="h6" component="span" fontWeight={600}>
                Үйлчлүүлэгчийн мэдээлэл засах
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
            <IconButton 
              size="small" 
              onClick={cancelDelete}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
              }}
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

        {/* Detail View Dialog */}
        <Dialog 
          open={openDetailView} 
          onClose={() => setOpenDetailView(false)} 
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
                Үйлчлүүлэгчийн дэлгэрэнгүй мэдээлэл
              </Typography>
            </Box>
            <IconButton 
              size="small" 
              onClick={() => setOpenDetailView(false)}
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
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Үндсэн мэдээлэл</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><strong>Нэр:</strong> {detailViewData?.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Төрсөн огноо:</strong> {detailViewData?.birthDate}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Нас:</strong> {detailViewData?.age}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Төрөл:</strong> {detailViewData?.type}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><strong>Хаяг:</strong> {detailViewData?.address}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Утас:</strong> {detailViewData?.phone}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Амин үзүүлэлт</Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography><strong>Цусны даралт:</strong> {detailViewData?.healthIndicators?.bloodPressure}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography><strong>Зүрхний цохилт:</strong> {detailViewData?.healthIndicators?.heartRate}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography><strong>Биеийн хэм:</strong> {detailViewData?.healthIndicators?.temperature}°C</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography><strong>Жин:</strong> {detailViewData?.healthIndicators?.weight} кг</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography><strong>Өндөр:</strong> {detailViewData?.healthIndicators?.height} см</Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Үзлэгийн түүх</Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Огноо</strong></TableCell>
                      <TableCell><strong>Эмч</strong></TableCell>
                      <TableCell><strong>Онош</strong></TableCell>
                      <TableCell><strong>Тэмдэглэл</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detailViewData?.examinations?.map((exam, index) => (
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
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Эмчилгээний түүх</Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Огноо</strong></TableCell>
                      <TableCell><strong>Эмчилгээ</strong></TableCell>
                      <TableCell><strong>Хугацаа</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detailViewData?.treatments?.map((treatment, index) => (
                      <TableRow key={index}>
                        <TableCell>{treatment.date}</TableCell>
                        <TableCell>{treatment.treatment}</TableCell>
                        <TableCell>{treatment.duration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Өвчний түүх</Typography>
              <List>
                {detailViewData?.medicalHistory?.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={`${item.year}: ${item.description}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </DialogContent>
          
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button 
              onClick={() => setOpenDetailView(false)}
              variant="outlined"
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none',
                px: 3
              }}
            >
              Хаах
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}