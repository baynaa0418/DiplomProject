import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Tabs, 
  Tab, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Collapse,
  Grid,
  Divider
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

// Mock medical history data - in a real app, this would come from an API
const generateMockHistoryData = (patientId) => {
  if (!patientId || typeof patientId !== "string" || patientId.length === 0) {
    return [];
  }
  // Generate consistent but random-looking data based on patient ID
  const historyLength = patientId.charCodeAt(0) % 3 + 2; // 2-4 entries
  
  const history = [];
  const now = new Date();
  
  for (let i = 0; i < historyLength; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (i * 14)); // Every 2 weeks in the past
    
    history.push({
      id: `${patientId}-${i}`,
      date: date.toISOString().split('T')[0],
      doctor: ['Б. Сүхбат', 'Д. Шинэбаяр', 'Г. Хулан'][i % 3],
      diagnosis: ['Ханиад', 'Багтраа', 'Томуу', 'Шумуулын хазалт'][i % 4],
      diagnosisCode: ['J00', 'J45.9', 'J11', 'T63.4'][i % 4],
      type: i === 0 ? 'Давтан' : 'Анхан',
      status: i === 0 ? 'Хийгдэж буй' : 'Дууссан',
      vitals: {
        temperature: (36.5 + (i * 0.3)).toFixed(1),
        bloodPressure: `${120 + (i * 5)}/${80 + (i * 2)}`,
        heartRate: 70 + (i * 3),
        respiratoryRate: 16 + i,
        weight: 65 - (i * 0.5),
        height: 170
      },
      prescriptions: [
        {
          name: ['Парацетамол', 'Ибупрофен', 'Амоксициллин'][i % 3],
          dosage: ['500мг', '400мг', '250мг'][i % 3],
          frequency: ['8 цаг тутамд', '6 цаг тутамд', '12 цаг тутамд'][i % 3],
          duration: ['7 хоног', '5 хоног', '10 хоног'][i % 3]
        },
        i % 2 === 0 ? {
          name: ['Лоратадин', 'Ацетаминофен', 'Цетиризин'][i % 3],
          dosage: ['10мг', '500мг', '5мг'][i % 3],
          frequency: ['Өдөрт 1 удаа', 'Өдөрт 2 удаа', 'Өдөрт 1 удаа'][i % 3],
          duration: ['5 хоног', '3 хоног', '7 хоног'][i % 3]
        } : null
      ].filter(Boolean),
      notes: [
        'Амралт, хангалттай шингэн уух',
        'Хоолны дэглэм сахих, архи согтууруулах ундаа хэрэглэхгүй байх',
        'Дасгал хөдөлгөөн хийх, гэрийн нөхцөлд эмчлэх'
      ][i % 3]
    });
  }
  
  return history;
};

// Row component for expandable table
const HistoryRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <TableRow 
        hover
        sx={{ 
          '&:last-child td, &:last-child th': { border: 0 },
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.04)' },
        }}
        onClick={() => setOpen(!open)}
      >
        <TableCell padding="checkbox">
          <IconButton size="small" onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarTodayOutlinedIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            {row.date}
          </Box>
        </TableCell>
        <TableCell sx={{ py: 1.5 }}>{row.doctor}</TableCell>
        <TableCell sx={{ py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {row.diagnosis}
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              ({row.diagnosisCode})
            </Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ py: 1.5 }}>
          <Chip 
            label={row.type} 
            size="small" 
            color={row.type === 'Анхан' ? 'primary' : 'secondary'}
            variant="outlined"
            sx={{ borderRadius: '4px', minWidth: 70, textAlign: 'center' }}
          />
        </TableCell>
        <TableCell sx={{ py: 1.5 }}>
          <Chip 
            label={row.status} 
            size="small" 
            color={row.status === 'Дууссан' ? 'success' : 'info'}
            sx={{ borderRadius: '4px', minWidth: 90, textAlign: 'center' }}
          />
        </TableCell>
      </TableRow>
      
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 3, px: 2 }}>
              <Grid container spacing={3}>
                {/* Vitals */}
                <Grid item xs={12} md={6}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <MonitorHeartOutlinedIcon sx={{ color: 'primary.main', fontSize: 20, mr: 1 }} />
                      <Typography variant="subtitle2" fontWeight="600">Амин үзүүлэлт</Typography>
                    </Box>
                    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">Биеийн халуун:</Typography>
                          <Typography variant="body2" fontWeight="medium">{row.vitals.temperature}°C</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">Цусны даралт:</Typography>
                          <Typography variant="body2" fontWeight="medium">{row.vitals.bloodPressure} mmHg</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">Зүрхний цохилт:</Typography>
                          <Typography variant="body2" fontWeight="medium">{row.vitals.heartRate} удаа/мин</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">Амьсгал:</Typography>
                          <Typography variant="body2" fontWeight="medium">{row.vitals.respiratoryRate} удаа/мин</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">Жин:</Typography>
                          <Typography variant="body2" fontWeight="medium">{row.vitals.weight} кг</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">Өндөр:</Typography>
                          <Typography variant="body2" fontWeight="medium">{row.vitals.height} см</Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                </Grid>
                
                {/* Prescriptions */}
                <Grid item xs={12} md={6}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <MedicationOutlinedIcon sx={{ color: 'warning.main', fontSize: 20, mr: 1 }} />
                      <Typography variant="subtitle2" fontWeight="600">Эмийн жор</Typography>
                    </Box>
                    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                      {row.prescriptions.length > 0 ? (
                        row.prescriptions.map((prescription, index) => (
                          <Box key={index} sx={{ mb: index < row.prescriptions.length - 1 ? 1.5 : 0 }}>
                            <Typography variant="body2" fontWeight="medium">{prescription.name}</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                              <Chip 
                                label={prescription.dosage} 
                                size="small" 
                                variant="outlined"
                                sx={{ borderRadius: '4px', height: 22 }}
                              />
                              <Chip 
                                label={prescription.frequency} 
                                size="small" 
                                variant="outlined"
                                sx={{ borderRadius: '4px', height: 22 }}
                              />
                              <Chip 
                                label={prescription.duration} 
                                size="small" 
                                variant="outlined"
                                sx={{ borderRadius: '4px', height: 22 }}
                              />
                            </Box>
                            {index < row.prescriptions.length - 1 && <Divider sx={{ my: 1 }} />}
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">Эмийн жор байхгүй</Typography>
                      )}
                    </Paper>
                  </Box>
                </Grid>
                
                {/* Notes */}
                <Grid item xs={12}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AssignmentOutlinedIcon sx={{ color: 'success.main', fontSize: 20, mr: 1 }} />
                      <Typography variant="subtitle2" fontWeight="600">Тэмдэглэл</Typography>
                    </Box>
                    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                      <Typography variant="body2">{row.notes}</Typography>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const PatientMedicalHistory = ({ patient }) => {
  const [tabValue, setTabValue] = useState(0);
  const medicalHistory = generateMockHistoryData(patient.id);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  return (
    <Card sx={{ 
      mb: 3, 
      borderRadius: 2, 
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
      '&:hover': {
        boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)'
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <HistoryIcon sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" fontWeight="600">Үзлэгийн түүх</Typography>
        </Box>
        
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{ 
            mb: 2,
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': { 
              minWidth: 100,
              fontSize: '0.875rem',
              textTransform: 'none',
              fontWeight: 500,
              py: 1.5
            } 
          }}
        >
          <Tab 
            label="Бүгд" 
            icon={<AssignmentOutlinedIcon fontSize="small" />} 
            iconPosition="start"
          />
        </Tabs>
        
        {medicalHistory.length > 0 ? (
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 1, boxShadow: 'none' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                  <TableCell width={50}></TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Огноо</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Эмч</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Онош</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Төрөл</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Төлөв</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicalHistory.map((history) => (
                  <HistoryRow key={history.id} row={history} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              p: 5, 
              bgcolor: 'background.paper',
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 1
            }}
          >
            <Typography color="text.secondary">Үзлэгийн түүх бүртгэгдээгүй байна</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientMedicalHistory;