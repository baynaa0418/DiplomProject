import React, { useState } from 'react';
import { 
  Box, Typography, Chip, Card, CardContent, Alert,
  Button, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, IconButton, List, ListItem, ListItemText
} from '@mui/material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

const PatientChronicDiseases = ({ chronicDiseases = [], onUpdate }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newDisease, setNewDisease] = useState('');
  const [error, setError] = useState('');
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setNewDisease('');
    setError('');
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleAddDisease = () => {
    if (!newDisease.trim()) {
      setError('Өвчний нэр оруулна уу');
      return;
    }
    
    if (chronicDiseases.includes(newDisease.trim())) {
      setError('Энэ өвчин аль хэдийн бүртгэгдсэн байна');
      return;
    }
    
    // Add the new disease if onUpdate function is provided
    if (onUpdate && typeof onUpdate === 'function') {
      onUpdate([...chronicDiseases, newDisease.trim()]);
    }
    
    setOpenDialog(false);
  };
  
  const handleDeleteDisease = (diseaseToDelete) => {
    // Remove the disease if onUpdate function is provided
    if (onUpdate && typeof onUpdate === 'function') {
      onUpdate(chronicDiseases.filter(disease => disease !== diseaseToDelete));
    }
  };

  return (
    <Card sx={{ 
      mb: 3, 
      borderRadius: 2, 
      boxShadow: '0px 4px 12px rgba(229, 57, 53, 0.2)',
      border: '1px solid #e53935',
      backgroundColor: 'rgba(229, 57, 53, 0.05)',
      '&:hover': {
        boxShadow: '0px 6px 16px rgba(229, 57, 53, 0.25)'
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HealthAndSafetyIcon sx={{ color: 'error.main', mr: 1, fontSize: 28 }} />
            <Typography variant="h6" fontWeight="600" color="error.dark">Анхааруулга: Архаг өвчин</Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleOpenDialog}
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '0.75rem',
              py: 0.5
            }}
          >
            Өвчин нэмэх
          </Button>
        </Box>
        
        {chronicDiseases.length > 0 ? (
          <>
            <Alert 
              severity="error" 
              icon={<MonitorHeartIcon />}
              sx={{ mb: 2, fontWeight: 500 }}
            >
              Энэ үйлчлүүлэгч дараах архаг өвчинтэй тул эмчилгээнд анхаарна уу!
            </Alert>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {chronicDiseases.map((disease, index) => (
                <Chip 
                  key={index} 
                  label={disease} 
                  size="medium" 
                  color="error" 
                  onDelete={() => handleDeleteDisease(disease)}
                  sx={{ 
                    borderRadius: '4px',
                    fontWeight: 500,
                    px: 1,
                    py: 2.5,
                    '& .MuiChip-label': { px: 1 }
                  }} 
                />
              ))}
            </Box>
          </>
        ) : (
          <Alert severity="info" sx={{ mt: 1 }}>
            Бүртгэлтэй архаг өвчин байхгүй байна
          </Alert>
        )}
      </CardContent>

      {/* Add Disease Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }}>
          Архаг өвчин нэмэх
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            label="Өвчний нэр"
            fullWidth
            variant="outlined"
            value={newDisease}
            onChange={(e) => setNewDisease(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ mb: 2 }}
          />
          {chronicDiseases.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Одоогийн архаг өвчнүүд:</Typography>
              <List dense sx={{ bgcolor: 'background.paper', border: '1px solid #eee', borderRadius: 1 }}>
                {chronicDiseases.map((disease, index) => (
                  <ListItem key={index} divider={index < chronicDiseases.length - 1}>
                    <ListItemText primary={disease} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseDialog} variant="outlined" color="inherit">
            Цуцлах
          </Button>
          <Button 
            onClick={handleAddDisease} 
            variant="contained" 
            color="error"
          >
            Нэмэх
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PatientChronicDiseases;