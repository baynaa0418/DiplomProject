import React from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Typography, IconButton, Box, TextField, Button,
  List, ListItem, ListItemText, ListItemAvatar, Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { mockPatients } from './mockdata';

const PatientSearchDialog = ({ 
  open, 
  onClose, 
  patients = mockPatients, 
  searchValue, 
  onSearchChange, 
  onSelectPatient 
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 3,
          pb: 2
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>Үйлчлүүлэгч сонгох</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3, pt: 1 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Нэр эсвэл регистрийн дугаараар хайх"
            value={searchValue}
            onChange={onSearchChange}
            size="small"
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            sx={{ 
              bgcolor: 'white', 
              borderRadius: 1, 
              border: '1px solid #eee',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.light',
                },
              },
            }}
          />
        </Box>
        
        <List sx={{ 
          maxHeight: 400, 
          overflow: 'auto',
          bgcolor: 'white',
          borderRadius: 1,
          border: '1px solid #eee',
          p: 0,
          boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.03)'
        }}>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <ListItem 
                key={patient._id || patient.id || patient.registerNum}
                onClick={() => onSelectPatient(patient)}
                sx={{ 
                  borderBottom: '1px solid #eee',
                  '&:last-child': { borderBottom: 'none' },
                  p: 2,
                  cursor: 'pointer',
                  '&:hover': { 
                    bgcolor: 'rgba(25, 118, 210, 0.08)',
                    boxShadow: 'inset 0px 0px 0px 1px rgba(25, 118, 210, 0.2)'
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ 
                    bgcolor: 'primary.light',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                  }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography fontWeight="500">
                      {patient.lastName} {patient.firstName}
                    </Typography>
                  }
                  secondary={
                    <Box component="span">
                      <Typography variant="body2" component="span">
                        {patient.registerNum}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{
                          ml: 2,
                          color: 'text.secondary'
                        }}
                      >
                        {patient.firstName}, {patient.age} настай
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                Хайлтад тохирох үйлчлүүлэгч олдсонгүй
              </Typography>
            </Box>
          )}
        </List>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button 
          variant="outlined" 
          onClick={onClose}
          sx={{ 
            borderRadius: '8px', 
            textTransform: 'none',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
            '&:hover': {
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          Цуцлах
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientSearchDialog;