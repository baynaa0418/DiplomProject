import React from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const PatientSelection = ({ onOpenDialog }) => {
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
          <Avatar sx={{ 
            width: 70, 
            height: 70, 
            bgcolor: 'primary.light', 
            mb: 2,
            boxShadow: '0px 4px 8px rgba(25, 118, 210, 0.2)'
          }}>
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h6" fontWeight="600" gutterBottom>Үйлчлүүлэгч сонгоно уу</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Үзлэг бүртгэлийн өмнө үйлчлүүлэгчийг сонгоно уу
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={onOpenDialog}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none',
              px: 4,
              boxShadow: '0px 4px 10px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                boxShadow: '0px 6px 15px rgba(25, 118, 210, 0.4)'
              }
            }}
          >
            Үйлчлүүлэгч сонгох
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PatientSelection;