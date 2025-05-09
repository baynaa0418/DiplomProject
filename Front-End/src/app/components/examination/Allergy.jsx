import React, { useState } from 'react';
import { 
  Box, Typography, Chip, Card, CardContent, Alert, 
  Button, TextField, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton, List, ListItem, ListItemText
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

const PatientAllergies = ({ allergies = [], onUpdate }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newAllergy, setNewAllergy] = useState('');
  const [error, setError] = useState('');
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setNewAllergy('');
    setError('');
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleAddAllergy = () => {
    if (!newAllergy.trim()) {
      setError('Харшлын нэр оруулна уу');
      return;
    }
    
    if (allergies.includes(newAllergy.trim())) {
      setError('Энэ харшил аль хэдийн бүртгэгдсэн байна');
      return;
    }
    
    // Add the new allergy if onUpdate function is provided
    if (onUpdate && typeof onUpdate === 'function') {
      onUpdate([...allergies, newAllergy.trim()]);
    }
    
    setOpenDialog(false);
  };
  
  const handleDeleteAllergy = (allergyToDelete) => {
    // Remove the allergy if onUpdate function is provided
    if (onUpdate && typeof onUpdate === 'function') {
      onUpdate(allergies.filter(allergy => allergy !== allergyToDelete));
    }
  };

  return (
    <Card sx={{ 
      mb: 3, 
      borderRadius: 2, 
      boxShadow: '0px 4px 12px rgba(255, 152, 0, 0.2)',
      border: '1px solid #ff9800',
      backgroundColor: 'rgba(255, 152, 0, 0.05)',
      '&:hover': {
        boxShadow: '0px 6px 16px rgba(255, 152, 0, 0.25)'
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ReportProblemIcon sx={{ color: 'warning.main', mr: 1, fontSize: 28 }} />
            <Typography variant="h6" fontWeight="600" color="warning.dark">Анхааруулга: Харшил</Typography>
          </Box>
          <Button
            variant="outlined"
            color="warning"
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
            Харшил нэмэх
          </Button>
        </Box>
        
        {allergies.length > 0 ? (
          <>
            <Alert 
              severity="warning" 
              icon={<WarningAmberIcon />}
              sx={{ mb: 2, fontWeight: 500 }}
            >
              Энэ үйлчлүүлэгч дараах харшилтай тул эмчилгээнд анхаарна уу!
            </Alert>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {allergies.map((allergy, index) => (
                <Chip 
                  key={index} 
                  label={allergy} 
                  size="medium" 
                  color="warning" 
                  onDelete={() => handleDeleteAllergy(allergy)}
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
            Бүртгэлтэй харшил байхгүй байна
          </Alert>
        )}
      </CardContent>

      {/* Add Allergy Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }}>
          Харшил нэмэх
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
            label="Харшлын нэр"
            fullWidth
            variant="outlined"
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ mb: 2 }}
          />
          {allergies.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Одоогийн харшлууд:</Typography>
              <List dense sx={{ bgcolor: 'background.paper', border: '1px solid #eee', borderRadius: 1 }}>
                {allergies.map((allergy, index) => (
                  <ListItem key={index} divider={index < allergies.length - 1}>
                    <ListItemText primary={allergy} />
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
            onClick={handleAddAllergy} 
            variant="contained" 
            color="warning"
            sx={{ color: 'white' }}
          >
            Нэмэх
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PatientAllergies;