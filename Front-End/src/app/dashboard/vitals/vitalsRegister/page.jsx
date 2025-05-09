'use client';
import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ScaleIcon from '@mui/icons-material/Scale';
import StraightenIcon from '@mui/icons-material/Straighten';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AirIcon from '@mui/icons-material/Air';
import NotesIcon from '@mui/icons-material/Notes';
import { useRouter } from 'next/navigation';

export default function VitalsForm() {
  const router = useRouter();
  
  // Form data state
  const [formData, setFormData] = useState({
    bloodPressure: '',
    pulse: '',
    temperature: '',
    oxygenSaturation: '',
    height: '',
    weight: '',
    bloodType: '',
    respiratoryRate: '',
    notes: '',
  });
  
  // Success dialog state
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  // Confirmation dialog state
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleBack = () => {
    router.push('/examination');
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    setOpenConfirmDialog(true);
  };
  
  const confirmSave = () => {
    // Here you would typically send data to backend
    console.log("Saving vitals data:", formData);
    
    setOpenConfirmDialog(false);
    setOpenSuccessDialog(true);
  };
  
  const handleSuccessClose = () => {
    setOpenSuccessDialog(false);
    router.push('/examination');
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'white' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
        {/* Header Section */}
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          {/* Title and actions */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                <Typography variant="h4" component="h1" fontWeight="600">Үзлэгийн мэдээлэл</Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Үйлчлүүлэгчийн үзлэгийн мэдээллийг бүртгэнэ үү.
                </Typography>
              </Box>
            </Box>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none',
                px: 3
              }}
            >
              Хадгалах
            </Button>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ flexGrow: 1, mx: 3, mb: 3 }}>
          <Paper sx={{ p: 3, border: '1px solid #eee', boxShadow: 'none', borderRadius: '12px' }}>
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={3}>
                {/* Vital Signs Section */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
                    Үндсэн шинж тэмдэг
                  </Typography>
                </Grid>
                
                {/* Row 1 */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Цусны даралт"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleFormChange}
                    variant="outlined"
                    size="small"
                    placeholder=""
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MonitorHeartIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Зүрхний цохилт"
                    name="pulse"
                    value={formData.pulse}
                    onChange={handleFormChange}
                    variant="outlined"
                    size="small"
                    placeholder=""
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FavoriteIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: <InputAdornment position="end">/мин</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Биеийн температур"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleFormChange}
                    variant="outlined"
                    size="small"
                    placeholder=""
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ThermostatIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: <InputAdornment position="end">°C</InputAdornment>,
                    }}
                  />
                </Grid>
                
                {/* Row 2 */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Хүчилтөрөгчийн ханасан байдал"
                    name="oxygenSaturation"
                    value={formData.oxygenSaturation}
                    onChange={handleFormChange}
                    variant="outlined"
                    size="small"
                    placeholder=""
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BloodtypeIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Амьсгалын давтамж"
                    name="respiratoryRate"
                    value={formData.respiratoryRate}
                    onChange={handleFormChange}
                    variant="outlined"
                    size="small"
                    placeholder=""
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AirIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: <InputAdornment position="end">/мин</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Цусны бүлэг"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleFormChange}
                    variant="outlined"
                    size="small"
                    placeholder="AB+"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BloodtypeIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                {/* Anthropometric Section */}
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
                    Биеийн хэмжилт
                  </Typography>
                </Grid>
                
                {/* Row 3 */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Өндөр"
                    name="height"
                    value={formData.height}
                    onChange={handleFormChange}
                    variant="outlined"
                    size="small"
                    placeholder=""
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <StraightenIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: <InputAdornment position="end">см</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Жин"
                    name="weight"
                    value={formData.weight}
                    onChange={handleFormChange}
                    variant="outlined"
                    size="small"
                    placeholder=""
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ScaleIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: <InputAdornment position="end">кг</InputAdornment>,
                    }}
                  />
                </Grid>
                {/* Notes Section */}
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
                    Нэмэлт тэмдэглэл
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Тэмдэглэл"
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    variant="outlined"
                    size="small"
                    multiline
                    rows={3}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <NotesIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Box>
      
      {/* Confirmation Dialog */}
      <Dialog 
        open={openConfirmDialog} 
        onClose={() => setOpenConfirmDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            width: '400px',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}
        >
          <Box component="div">
            <Typography variant="h6" component="span" fontWeight={600}>
              Мэдээлэл хадгалах
            </Typography>
          </Box>
          <IconButton 
            size="small" 
            onClick={() => setOpenConfirmDialog(false)}
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
            Үзлэгийн мэдээллийг хадгалахдаа итгэлтэй байна уу?
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2, justifyContent: 'center' }}>
          <Button 
            onClick={() => setOpenConfirmDialog(false)}
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
            onClick={confirmSave}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none',
              px: 3,
              minWidth: '120px'
            }}
          >
            Хадгалах
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Success Dialog */}
      <Dialog 
        open={openSuccessDialog} 
        PaperProps={{
          sx: {
            borderRadius: '12px',
            width: '400px',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        <DialogContent sx={{ pt: 3, textAlign: 'center' }}>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Амжилттай!
          </Typography>
          <Typography>
            Үзлэгийн мэдээллийг амжилттай хадгаллаа.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ pb: 3, py: 2, justifyContent: 'center' }}>
          <Button 
            fullWidth
            variant="contained" 
            onClick={handleSuccessClose}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none',
              px: 3
            }}
          >
            Үзлэгийн хуудас руу буцах
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}