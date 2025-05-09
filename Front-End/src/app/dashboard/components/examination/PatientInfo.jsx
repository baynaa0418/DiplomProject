import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PatientInfo = ({ patient, onChangePatient }) => {
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="600">Үйлчлүүлэгчийн үндсэн мэдээлэл</Typography>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={onChangePatient}
            startIcon={<CloseIcon />}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
              '&:hover': {
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            Өөр үйлчлүүлэгч сонгох
          </Button>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Овог:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" fontWeight="500">{patient.lastName}</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Регистрийн дугаар:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" fontWeight="500">{patient.registerNum}</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Салбар суурьлуул:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" fontWeight="500">{patient.gender}</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Нас:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" fontWeight="500">{patient.age}</Typography>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Нэр:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" fontWeight="500">{patient.firstName}</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Төрөл:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" fontWeight="500">{patient.department}</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Мэргэжил:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" fontWeight="500">{patient.doctorType}</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Хүйс:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" fontWeight="500">{patient.section}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PatientInfo;