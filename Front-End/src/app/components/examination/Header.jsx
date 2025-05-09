import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = ({ onBack }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <IconButton 
        onClick={onBack}
        sx={{ 
          color: 'primary.main',
          bgcolor: 'rgba(25, 118, 210, 0.08)',
          mr: 1,
          '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.12)' }
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h5" fontWeight="600">Шинэ үзлэг</Typography>
    </Box>
  );
};

export default Header;