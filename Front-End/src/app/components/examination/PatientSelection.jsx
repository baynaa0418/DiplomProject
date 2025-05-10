import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  InputAdornment,
  Paper,
  Divider,
  Avatar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

const PatientSelection = ({ onOpenDialog, patients = [], onSelectPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient => {
    const fullName = `${patient.lastName} ${patient.firstName}`.toLowerCase();
    const registerNum = patient.registerNum?.toLowerCase() || '';
    const searchLower = searchTerm.toLowerCase();
    return fullName.includes(searchLower) || registerNum.includes(searchLower);
  });

  return (
    <Card sx={{ 
      mb: 3, 
      borderRadius: 2, 
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
      transition: 'box-shadow 0.3s ease',
      '&:hover': {
        boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)'
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="600" gutterBottom>Үйлчлүүлэгч сонгох</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Үзлэг бүртгэлийн өмнө үйлчлүүлэгчийг сонгоно уу
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Үйлчлүүлэгч хайх..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
          </Box>

          <Paper 
            sx={{ 
              maxHeight: 400, 
              overflow: 'auto',
              border: '1px solid #eee',
              borderRadius: '8px'
            }}
          >
            {filteredPatients.length > 0 ? (
              <List>
                {filteredPatients.map((patient, index) => (
                  <React.Fragment key={patient.id || patient._id}>
                    <ListItemButton
                      onClick={() => onSelectPatient(patient)}
                      sx={{
                        py: 1.5,
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          mr: 2, 
                          bgcolor: 'primary.light',
                          width: 40,
                          height: 40
                        }}
                      >
                        <PersonIcon />
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography component="span" fontWeight="500">
                            {patient.lastName} {patient.firstName}
                          </Typography>
                        }
                        secondary={
                          <Box component="span" sx={{ display: 'block', mt: 0.5 }}>
                            <Typography component="span" variant="body2" color="text.secondary">
                              {patient.registerNum}
                            </Typography>
                            <Typography component="span" variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                              •
                            </Typography>
                            <Typography component="span" variant="body2" color="text.secondary">
                              {patient.age} настай
                            </Typography>
                            <Typography component="span" variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                              •
                            </Typography>
                            <Typography component="span" variant="body2" color="text.secondary">
                              {patient.type}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItemButton>
                    {index < filteredPatients.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  {searchTerm ? 'Үйлчлүүлэгч олдсонгүй' : 'Үйлчлүүлэгч байхгүй байна'}
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PatientSelection;