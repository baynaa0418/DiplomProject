import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';

const ServiceCategories = ({ tabValue, onChange }) => {
  // Service categories
  const serviceCategories = [
    { id: 1, name: 'Амин үзүүлэлт', icon: <DescriptionOutlinedIcon sx={{ fontSize: 40, color: 'primary.main' }} /> },
    { id: 2, name: 'Үзлэг, оношилгоо', icon: <LocalHospitalOutlinedIcon sx={{ fontSize: 40, color: 'error.light' }} /> },
    { id: 3, name: 'Эмчилгээний заавар', icon: <MedicationOutlinedIcon sx={{ fontSize: 40, color: 'success.main' }} /> },
    { id: 4, name: 'Эмийн жор', icon: <ScienceOutlinedIcon sx={{ fontSize: 40, color: 'warning.main' }} /> },
  ];

  return (
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
      {serviceCategories.map((category) => (
        <Card 
          key={category.id} 
          sx={{ 
            width: '23%', 
            borderRadius: 2, 
            boxShadow: tabValue === category.id - 1 
              ? '0px 8px 16px rgba(25, 118, 210, 0.2)' 
              : '0px 4px 8px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            bgcolor: tabValue === category.id - 1 ? 'primary.50' : 'white',
            border: tabValue === category.id - 1 ? '1px solid' : 'none',
            borderColor: tabValue === category.id - 1 ? 'primary.main' : 'transparent',
            transform: tabValue === category.id - 1 ? 'translateY(-4px)' : 'none',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer'
            }
          }}
          onClick={() => onChange(category.id - 1)}
        >
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              height: 70, 
              width: 70,
              borderRadius: '50%',
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              mb: 1
            }}>
              {category.icon}
            </Box>
            <Typography align="center" sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
              {category.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ServiceCategories;