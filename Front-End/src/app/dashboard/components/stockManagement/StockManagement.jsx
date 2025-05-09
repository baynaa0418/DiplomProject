'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Card, CardContent, Grid, 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Chip, Button, IconButton, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, Tabs, Tab,
  Divider, Avatar, InputAdornment, TablePagination, Tooltip,
  Alert, Snackbar, CircularProgress, Autocomplete
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
import MedicationIcon from '@mui/icons-material/Medication';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DescriptionIcon from '@mui/icons-material/Description';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PrintIcon from '@mui/icons-material/Print';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useRouter } from 'next/navigation';

// Mock data for stock items
const mockStockItems = [
  {
    id: 'MED-001',
    name: 'Парацетамол',
    category: 'Эм',
    subCategory: 'Өвдөлт намдаах',
    form: 'Шахмал',
    dosage: '500мг',
    manufacturer: 'Фарма Интернэшнл',
    supplier: 'Монос Фарм',
    batchNumber: 'BT12345',
    expiryDate: '2026-04-16',
    quantity: 1350,
    unit: 'шахмал',
    location: 'Хурдан авалт A-05',
    reorderLevel: 300,
    price: 8.5,
    status: 'Хангалттай',
    lastUpdated: '2025-04-10',
    description: 'Өвдөлт намдаах, халуун бууруулах'
  },
  {
    id: 'MED-002',
    name: 'Амоксициллин',
    category: 'Эм',
    subCategory: 'Антибиотик',
    form: 'Капсул',
    dosage: '250мг',
    manufacturer: 'Байер',
    supplier: 'Гранд Фарма',
    batchNumber: 'BT23456',
    expiryDate: '2025-11-20',
    quantity: 180,
    unit: 'капсул',
    location: 'Антибиотик B-03',
    reorderLevel: 200,
    price: 16.8,
    status: 'Дахин захиалах',
    lastUpdated: '2025-04-05',
    description: 'Өргөн хүрээний антибиотик'
  },
  {
    id: 'MED-003',
    name: 'Ибупрофен',
    category: 'Эм',
    subCategory: 'Өвдөлт намдаах',
    form: 'Шахмал',
    dosage: '400мг',
    manufacturer: 'Фарма Интернэшнл',
    supplier: 'Монос Фарм',
    batchNumber: 'BT34567',
    expiryDate: '2026-06-18',
    quantity: 880,
    unit: 'шахмал',
    location: 'Хурдан авалт A-07',
    reorderLevel: 150,
    price: 10.2,
    status: 'Хангалттай',
    lastUpdated: '2025-04-08',
    description: 'Үрэвсэл намдаах, өвдөлт намдаах'
  },
  {
    id: 'MED-004',
    name: 'Цетиризин',
    category: 'Эм',
    subCategory: 'Харшлын эсрэг',
    form: 'Шахмал',
    dosage: '10мг',
    manufacturer: 'ГлаксоСмитКлайн',
    supplier: 'Гранд Фарма',
    batchNumber: 'BT45678',
    expiryDate: '2025-09-15',
    quantity: 65,
    unit: 'шахмал',
    location: 'Харшлын эсрэг C-02',
    reorderLevel: 100,
    price: 18.5,
    status: 'Дуусаж байгаа',
    lastUpdated: '2025-04-02',
    description: 'H1 гистамины антагонист, харшлын эсрэг'
  },
  {
    id: 'SUP-001',
    name: 'Хөвөн',
    category: 'Хэрэгсэл',
    subCategory: 'Боолт',
    form: 'Иж бүрдэл',
    dosage: null,
    manufacturer: 'МедСаплай ХХК',
    supplier: 'МедСаплай ХХК',
    batchNumber: 'BT56789',
    expiryDate: '2027-04-16',
    quantity: 235,
    unit: 'иж бүрдэл',
    location: 'Хэрэгсэл D-01',
    reorderLevel: 50,
    price: 4.2,
    status: 'Хангалттай',
    lastUpdated: '2025-04-12',
    description: 'Ариутгасан хөвөн боолт'
  },
  {
    id: 'SUP-002',
    name: 'Нэг удаагийн тариур',
    category: 'Хэрэгсэл',
    subCategory: 'Тариур',
    form: '5мл',
    dosage: null,
    manufacturer: 'МедСаплай ХХК',
    supplier: 'МедСаплай ХХК',
    batchNumber: 'BT67890',
    expiryDate: '2028-01-10',
    quantity: 25,
    unit: 'хайрцаг',
    location: 'Хэрэгсэл D-04',
    reorderLevel: 30,
    price: 35.0,
    status: 'Дахин захиалах',
    lastUpdated: '2025-03-25',
    description: 'Нэг удаагийн ариутгасан тариур, 100ш/хайрцаг'
  }
];

// Category and form options
const categoryOptions = ['Эм', 'Хэрэгсэл', 'Уусмал', 'Вакцин', 'Бусад'];
const subCategoryOptions = {
  'Эм': ['Өвдөлт намдаах', 'Антибиотик', 'Харшлын эсрэг', 'Даралт бууруулах', 'Чихрийн шижин', 'Бусад'],
  'Хэрэгсэл': ['Боолт', 'Тариур', 'Маск', 'Бээлий', 'Бусад'],
  'Уусмал': ['Физиологийн', 'Глюкоз', 'Рингер', 'Бусад'],
  'Вакцин': ['Томуу', 'Улаан бурхан', 'Саа', 'Бусад'],
  'Бусад': ['Бусад']
};
const formOptions = {
  'Эм': ['Шахмал', 'Капсул', 'Шингэн', 'Тариа', 'Наалт', 'Бусад'],
  'Хэрэгсэл': ['Иж бүрдэл', '5мл', '10мл', '20мл', 'Бусад'],
  'Уусмал': ['100мл', '250мл', '500мл', '1000мл', 'Бусад'],
  'Вакцин': ['0.5мл', '1мл', 'Бусад'],
  'Бусад': ['Бусад']
};

// Status options with colors
const statusOptions = [
  { value: 'Хангалттай', color: 'success' },
  { value: 'Дуусаж байгаа', color: 'warning' },
  { value: 'Дахин захиалах', color: 'error' },
  { value: 'Хугацаа дуусах дөхсөн', color: 'info' },
  { value: 'Идэвхгүй', color: 'default' }
];

const PharmacyStockManagement = () => {
  const router = useRouter();
  const [stockItems, setStockItems] = useState(mockStockItems);
  const [filteredItems, setFilteredItems] = useState(mockStockItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // New item/edit item form state
  const [itemForm, setItemForm] = useState({
    id: '',
    name: '',
    category: 'Эм',
    subCategory: '',
    form: '',
    dosage: '',
    manufacturer: '',
    supplier: '',
    batchNumber: '',
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Default 1 year from now
    quantity: 0,
    unit: '',
    location: '',
    reorderLevel: 0,
    price: 0,
    status: 'Хангалттай',
    description: ''
  });
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Filter items based on search and filters
  useEffect(() => {
    let result = stockItems;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query) ||
          (item.batchNumber && item.batchNumber.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(item => item.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(item => item.status === statusFilter);
    }
    
    setFilteredItems(result);
  }, [stockItems, searchQuery, categoryFilter, statusFilter]);
  
  // Handle filter dialog
  const handleOpenFilterDialog = () => {
    setFilterDialogOpen(true);
  };
  
  const handleCloseFilterDialog = () => {
    setFilterDialogOpen(false);
  };
  
  const applyFilters = () => {
    handleCloseFilterDialog();
  };
  
  // Handle item form changes
  const handleItemFormChange = (e) => {
    const { name, value } = e.target;
    setItemForm(prev => ({ ...prev, [name]: value }));
    
    // Handle category-dependent dropdowns
    if (name === 'category') {
      setItemForm(prev => ({
        ...prev,
        subCategory: '',
        form: ''
      }));
    }
  };
  
  const handleExpiryDateChange = (date) => {
    setItemForm(prev => ({ ...prev, expiryDate: date }));
  };
  
  // Handle add new item
  const handleOpenAddDialog = () => {
    // Generate a new ID based on category
    const prefix = itemForm.category === 'Эм' ? 'MED-' : 'SUP-';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `${prefix}${randomNum}`;
    
    // Reset form with new ID
    setItemForm({
      id: newId,
      name: '',
      category: 'Эм',
      subCategory: '',
      form: '',
      dosage: '',
      manufacturer: '',
      supplier: '',
      batchNumber: '',
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      quantity: 0,
      unit: '',
      location: '',
      reorderLevel: 0,
      price: 0,
      status: 'Хангалттай',
      description: ''
    });
    
    setAddDialogOpen(true);
  };
  
  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };
  
  const handleAddItem = () => {
    setLoading(true);
    
    // Validate form
    if (!itemForm.name || !itemForm.category) {
      setSnackbar({
        open: true,
        message: 'Шаардлагатай талбаруудыг бөглөнө үү',
        severity: 'error'
      });
      setLoading(false);
      return;
    }
    
    // Add lastUpdated field
    const newItem = {
      ...itemForm,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setStockItems(prev => [...prev, newItem]);
      setSnackbar({
        open: true,
        message: 'Бараа амжилттай нэмэгдлээ',
        severity: 'success'
      });
      setLoading(false);
      setAddDialogOpen(false);
    }, 1000);
  };
  
  // Handle edit item
  const handleOpenEditDialog = (item) => {
    setSelectedItem(item);
    setItemForm({
      ...item,
      expiryDate: new Date(item.expiryDate)
    });
    setEditDialogOpen(true);
  };
  
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };
  
  const handleUpdateItem = () => {
    setLoading(true);
    
    // Validate form
    if (!itemForm.name || !itemForm.category) {
      setSnackbar({
        open: true,
        message: 'Шаардлагатай талбаруудыг бөглөнө үү',
        severity: 'error'
      });
      setLoading(false);
      return;
    }
    
    // Update lastUpdated field
    const updatedItem = {
      ...itemForm,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setStockItems(prev => 
        prev.map(item => item.id === updatedItem.id ? updatedItem : item)
      );
      setSnackbar({
        open: true,
        message: 'Бараа амжилттай шинэчлэгдлээ',
        severity: 'success'
      });
      setLoading(false);
      setEditDialogOpen(false);
    }, 1000);
  };
  
  // Handle delete item
  const handleOpenDeleteDialog = (item) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  
  const handleDeleteItem = () => {
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setStockItems(prev => prev.filter(item => item.id !== selectedItem.id));
      setSnackbar({
        open: true,
        message: 'Бараа амжилттай устгагдлаа',
        severity: 'success'
      });
      setLoading(false);
      setDeleteDialogOpen(false);
    }, 1000);
  };
  
  // Handle snackbar close
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };
  
  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Handle back button
  const handleBack = () => {
    router.push('/dashboard');
  };
  
  // Get status chip color
  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.color : 'default';
  };
  
  // Get status-based row styling
  const getRowStyle = (item) => {
    if (item.status === 'Дахин захиалах') {
      return { bgcolor: 'rgba(229, 57, 53, 0.05)' };
    }
    if (item.status === 'Дуусаж байгаа') {
      return { bgcolor: 'rgba(255, 152, 0, 0.05)' };
    }
    if (item.status === 'Хугацаа дуусах дөхсөн') {
      return { bgcolor: 'rgba(3, 169, 244, 0.05)' };
    }
    return {};
  };
  
  // Check if item is low in stock
  const isLowStock = (item) => {
    return item.quantity <= item.reorderLevel;
  };
  
  // Check if item is near expiry
  const isNearExpiry = (item) => {
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    
    return expiryDate <= threeMonthsFromNow && expiryDate >= today;
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
          <Typography variant="h5" fontWeight="600">Эмийн сан - Агуулахын удирдлага</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAddDialog}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            Шинэ бараа
          </Button>
          
          
        </Box>
      </Box>
      
      {/* Tabs */}
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          mb: 3
        }}
      >
        <Tab 
          icon={<InventoryIcon />} 
          iconPosition="start"
          label="Бүх бараа" 
          sx={{ textTransform: 'none' }}
        />
        <Tab 
          icon={<MedicationIcon />} 
          iconPosition="start"
          label="Эм" 
          sx={{ textTransform: 'none' }}
        />
        <Tab 
          icon={<WarningIcon />} 
          iconPosition="start"
          label="Нөөц дуусаж байгаа" 
          sx={{ textTransform: 'none' }}
        />
        <Tab 
          icon={<ReceiptIcon />} 
          iconPosition="start"
          label="Орлого/Зарлага" 
          sx={{ textTransform: 'none' }}
        />
      </Tabs>
      
      {/* Status summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            borderLeft: '4px solid #4caf50',
            height: '100%'
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Нийт бараа
              </Typography>
              <Typography variant="h4" fontWeight="600" sx={{ mt: 1 }}>
                {stockItems.length}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Нийт {stockItems.reduce((acc, item) => acc + item.quantity, 0)} нэгж
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            borderLeft: '4px solid #f44336',
            height: '100%'
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Нөөц дуусаж байгаа
              </Typography>
              <Typography variant="h4" fontWeight="600" sx={{ mt: 1 }}>
                {stockItems.filter(item => item.status === 'Дахин захиалах' || item.status === 'Дуусаж байгаа').length}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Яаралтай нөхөн дүүргэх шаардлагатай
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            borderLeft: '4px solid #ff9800',
            height: '100%'
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Хугацаа дуусах дөхсөн
              </Typography>
              <Typography variant="h4" fontWeight="600" sx={{ mt: 1 }}>
                {stockItems.filter(item => isNearExpiry(item)).length}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                3 сарын дотор хугацаа дуусах
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            borderLeft: '4px solid #2196f3',
            height: '100%'
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Нийт үнэ цэнэ
              </Typography>
              <Typography variant="h4" fontWeight="600" sx={{ mt: 1 }}>
                {new Intl.NumberFormat('mn-MN', { style: 'currency', currency: 'MNT', maximumFractionDigits: 0 }).format(
                  stockItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Агуулахын нийт үнэ цэнэ
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Search and filter */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Нэр, ID эсвэл серийн дугаараар хайх"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          }}
          size="small"
        />
        
        <Button 
          variant="outlined" 
          startIcon={<FilterListIcon />}
          onClick={handleOpenFilterDialog}
          sx={{ minWidth: 120 }}
        >
          Шүүлтүүр
        </Button>
      </Box>
      
      {/* Items Table */}
      <Card sx={{ mb: 3, borderRadius: 2, flexGrow: 1 }}>
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Нэр</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Төрөл</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Тун/Хэмжээ</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Хугацаа</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Үлдэгдэл</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Нэгж үнэ</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Төлөв</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Сүүлд шинэчилсэн</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Үйлдэл</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow 
                      key={item.id} 
                      hover
                      sx={getRowStyle(item)}
                    >
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {item.name}
                          {isLowStock(item) && (
                            <Tooltip title="Нөөц бага байна">
                              <WarningIcon 
                                color="error" 
                                fontSize="small" 
                                sx={{ ml: 1 }} 
                              />
                            </Tooltip>
                          )}
                          {isNearExpiry(item) && (
                            <Tooltip title="Хугацаа дуусах дөхөж байна">
                              <WarningIcon 
                                color="warning" 
                                fontSize="small" 
                                sx={{ ml: 1 }} 
                              />
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        {item.dosage ? `${item.dosage}, ${item.form}` : item.form}
                      </TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                      <TableCell>
                        <Typography fontWeight={isLowStock(item) ? 600 : 400} color={isLowStock(item) ? 'error.main' : 'inherit'}>
                          {item.quantity} {item.unit}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('mn-MN', { style: 'currency', currency: 'MNT', maximumFractionDigits: 0 }).format(item.price)}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={item.status} 
                          size="small" 
                          color={getStatusColor(item.status)}
                          sx={{ borderRadius: '4px' }} 
                        />
                      </TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenEditDialog(item)}
                            color="primary"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDeleteDialog(item)}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                
                {filteredItems.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} align="center" sx={{ py: 3 }}>
                      <Typography color="text.secondary">
                        Бараа олдсонгүй
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            component="div"
            count={filteredItems.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage="Хуудсанд:"
          />
        </CardContent>
      </Card>
      
      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onClose={handleCloseFilterDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Шүүлтүүр</DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth margin="normal">
            <InputLabel>Төрөл</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Төрөл"
            >
              <MenuItem value="all">Бүгд</MenuItem>
              {categoryOptions.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Төлөв</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Төлөв"
            >
              <MenuItem value="all">Бүгд</MenuItem>
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box 
                      sx={{ 
                        width: 10, 
                        height: 10, 
                        borderRadius: '50%', 
                        bgcolor: `${option.color}.main`,
                        mr: 1
                      }} 
                    />
                    {option.value}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
      
      {/* Add Item Dialog */}
      <Dialog 
        open={addDialogOpen} 
        onClose={handleCloseAddDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>Шинэ бараа бүртгэх</DialogTitle>
  <DialogContent sx={{ pt: 0, pb: 2 }}>
    <Typography variant="body2" color="text.secondary">
      Агуулахад шинэ бараа бүртгэх
    </Typography>
  </DialogContent>
  <DialogContent dividers>
    {/* Your form content here */}
  </DialogContent>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="ID"
                name="id"
                value={itemForm.id}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Барааны нэр"
                name="name"
                value={itemForm.name}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Ангилал</InputLabel>
                <Select
                  name="category"
                  value={itemForm.category}
                  onChange={handleItemFormChange}
                  label="Ангилал"
                  required
                >
                  {categoryOptions.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Дэд ангилал</InputLabel>
                <Select
                  name="subCategory"
                  value={itemForm.subCategory}
                  onChange={handleItemFormChange}
                  label="Дэд ангилал"
                >
                  {(subCategoryOptions[itemForm.category] || []).map((subCategory) => (
                    <MenuItem key={subCategory} value={subCategory}>{subCategory}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Эмийн хэлбэр</InputLabel>
                <Select
                  name="form"
                  value={itemForm.form}
                  onChange={handleItemFormChange}
                  label="Эмийн хэлбэр"
                >
                  {(formOptions[itemForm.category] || []).map((form) => (
                    <MenuItem key={form} value={form}>{form}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                label="Тун"
                name="dosage"
                value={itemForm.dosage}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
                disabled={itemForm.category !== 'Эм'}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Үйлдвэрлэгч"
                name="manufacturer"
                value={itemForm.manufacturer}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Нийлүүлэгч"
                name="supplier"
                value={itemForm.supplier}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                label="Цувралын дугаар"
                name="batchNumber"
                value={itemForm.batchNumber}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Хугацаа дуусах огноо"
                  value={itemForm.expiryDate}
                  onChange={handleExpiryDateChange}
                  slotProps={{ 
                    textField: { 
                      fullWidth: true,
                      margin: "normal"
                    } 
                  }}
                  format="yyyy-MM-dd"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Байршил"
                name="location"
                value={itemForm.location}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <TextField
                label="Тоо хэмжээ"
                name="quantity"
                type="number"
                value={itemForm.quantity}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Хэмжих нэгж"
                name="unit"
                value={itemForm.unit}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Дахин захиалах түвшин"
                name="reorderLevel"
                type="number"
                value={itemForm.reorderLevel}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Нэгж үнэ (₮)"
                name="price"
                type="number"
                value={itemForm.price}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₮</InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Төлөв</InputLabel>
                <Select
                  name="status"
                  value={itemForm.status}
                  onChange={handleItemFormChange}
                  label="Төлөв"
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box 
                          sx={{ 
                            width: 10, 
                            height: 10, 
                            borderRadius: '50%', 
                            bgcolor: `${option.color}.main`,
                            mr: 1
                          }} 
                        />
                        {option.value}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Нийт үнэ цэнэ"
                value={new Intl.NumberFormat('mn-MN', { style: 'currency', currency: 'MNT', maximumFractionDigits: 0 })
                  .format(itemForm.price * itemForm.quantity)}
                fullWidth
                margin="normal"
                disabled
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Тайлбар"
                name="description"
                value={itemForm.description}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseAddDialog} 
            color="inherit"
            startIcon={<CloseIcon />}
          >
            Цуцлах
          </Button>
          <Button 
            onClick={handleAddItem} 
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ mr: 1 }} />
            ) : null}
            Хадгалах
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Edit Item Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={handleCloseEditDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>
          <Typography variant="h6">Бараа засах</Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedItem ? selectedItem.name : ''} мэдээллийг шинэчлэх
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="ID"
                name="id"
                value={itemForm.id}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Барааны нэр"
                name="name"
                value={itemForm.name}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Ангилал</InputLabel>
                <Select
                  name="category"
                  value={itemForm.category}
                  onChange={handleItemFormChange}
                  label="Ангилал"
                  required
                >
                  {categoryOptions.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Дэд ангилал</InputLabel>
                <Select
                  name="subCategory"
                  value={itemForm.subCategory}
                  onChange={handleItemFormChange}
                  label="Дэд ангилал"
                >
                  {(subCategoryOptions[itemForm.category] || []).map((subCategory) => (
                    <MenuItem key={subCategory} value={subCategory}>{subCategory}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Эмийн хэлбэр</InputLabel>
                <Select
                  name="form"
                  value={itemForm.form}
                  onChange={handleItemFormChange}
                  label="Эмийн хэлбэр"
                >
                  {(formOptions[itemForm.category] || []).map((form) => (
                    <MenuItem key={form} value={form}>{form}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                label="Тун"
                name="dosage"
                value={itemForm.dosage}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
                disabled={itemForm.category !== 'Эм'}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Үйлдвэрлэгч"
                name="manufacturer"
                value={itemForm.manufacturer}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Нийлүүлэгч"
                name="supplier"
                value={itemForm.supplier}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                label="Цувралын дугаар"
                name="batchNumber"
                value={itemForm.batchNumber}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Хугацаа дуусах огноо"
                  value={itemForm.expiryDate}
                  onChange={handleExpiryDateChange}
                  slotProps={{ 
                    textField: { 
                      fullWidth: true,
                      margin: "normal"
                    } 
                  }}
                  format="yyyy-MM-dd"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Байршил"
                name="location"
                value={itemForm.location}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <TextField
                label="Тоо хэмжээ"
                name="quantity"
                type="number"
                value={itemForm.quantity}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Хэмжих нэгж"
                name="unit"
                value={itemForm.unit}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Дахин захиалах түвшин"
                name="reorderLevel"
                type="number"
                value={itemForm.reorderLevel}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Нэгж үнэ (₮)"
                name="price"
                type="number"
                value={itemForm.price}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₮</InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Төлөв</InputLabel>
                <Select
                  name="status"
                  value={itemForm.status}
                  onChange={handleItemFormChange}
                  label="Төлөв"
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box 
                          sx={{ 
                            width: 10, 
                            height: 10, 
                            borderRadius: '50%', 
                            bgcolor: `${option.color}.main`,
                            mr: 1
                          }} 
                        />
                        {option.value}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Нийт үнэ цэнэ"
                value={new Intl.NumberFormat('mn-MN', { style: 'currency', currency: 'MNT', maximumFractionDigits: 0 })
                  .format(itemForm.price * itemForm.quantity)}
                fullWidth
                margin="normal"
                disabled
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Тайлбар"
                name="description"
                value={itemForm.description}
                onChange={handleItemFormChange}
                fullWidth
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseEditDialog} 
            color="inherit"
            startIcon={<CloseIcon />}
          >
            Цуцлах
          </Button>
          <Button 
            onClick={handleUpdateItem} 
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ mr: 1 }} />
            ) : null}
            Шинэчлэх
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleCloseDeleteDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>Бараа устгах</DialogTitle>
        <DialogContent>
          <Typography>
            "{selectedItem?.name}" барааг устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseDeleteDialog} 
            color="inherit"
          >
            Цуцлах
          </Button>
          <Button 
            onClick={handleDeleteItem} 
            variant="contained"
            color="error"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ mr: 1 }} />
            ) : null}
            Устгах
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// A transaction dialog component to make stock transactions (separate component for clarity)
const StockTransactionDialog = ({ open, onClose, onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    type: 'in', // 'in' for stock in, 'out' for stock out
    itemId: '',
    quantity: 0,
    reason: '',
    notes: '',
    date: new Date(),
    ...initialData
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
  };
  
  const handleSubmit = () => {
    onSave(formData);
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle>
        {formData.type === 'in' ? 'Бараа орлогодох' : 'Бараа зарлагадах'}
      </DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth margin="normal">
          <InputLabel>Төрөл</InputLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            label="Төрөл"
          >
            <MenuItem value="in">Орлого</MenuItem>
            <MenuItem value="out">Зарлага</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Бараа</InputLabel>
          <Select
            name="itemId"
            value={formData.itemId}
            onChange={handleChange}
            label="Бараа"
            required
          >
            {/* In a real app, you would populate this from your stock items */}
            <MenuItem value="MED-001">Парацетамол (500мг)</MenuItem>
            <MenuItem value="MED-002">Амоксициллин (250мг)</MenuItem>
            <MenuItem value="MED-003">Ибупрофен (400мг)</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          label="Тоо хэмжээ"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Шалтгаан</InputLabel>
          <Select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            label="Шалтгаан"
          >
            {formData.type === 'in' ? (
              <>
                <MenuItem value="purchase">Шинээр худалдан авсан</MenuItem>
                <MenuItem value="return">Буцаалт</MenuItem>
                <MenuItem value="adjustment">Тооллогын залруулга</MenuItem>
              </>
            ) : (
              <>
                <MenuItem value="sale">Борлуулалт</MenuItem>
                <MenuItem value="expired">Хугацаа дууссан</MenuItem>
                <MenuItem value="damaged">Гэмтэл/Эвдрэл</MenuItem>
                <MenuItem value="adjustment">Тооллогын залруулга</MenuItem>
              </>
            )}
          </Select>
        </FormControl>
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Огноо"
            value={formData.date}
            onChange={handleDateChange}
            slotProps={{ 
              textField: { 
                fullWidth: true,
                margin: "normal"
              } 
            }}
            format="yyyy-MM-dd"
          />
        </LocalizationProvider>
        
        <TextField
          label="Тэмдэглэл"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={2}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Цуцлах
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Хадгалах
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { StockTransactionDialog };
export default PharmacyStockManagement;