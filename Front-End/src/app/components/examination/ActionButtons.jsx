import React from 'react';
import { Box, Button } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ActionButtons = ({ onCancel, loading }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
      <Button
        variant="outlined"
        startIcon={<CancelOutlinedIcon />}
        onClick={onCancel}
        sx={{ 
          borderRadius: '8px', 
          textTransform: 'none',
          px: 4,
          py: 1,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        Цуцлах
      </Button>
      <Button
        type="submit"
        variant="contained"
        startIcon={<SaveOutlinedIcon />}
        disabled={loading}
        sx={{ 
          borderRadius: '8px', 
          textTransform: 'none',
          px: 4,
          py: 1,
          boxShadow: '0px 4px 10px rgba(25, 118, 210, 0.3)',
          '&:hover': {
            boxShadow: '0px 6px 15px rgba(25, 118, 210, 0.4)'
          }
        }}
      >
        {loading ? 'Хадгалж байна...' : 'Хадгалах'}
      </Button>
    </Box>
  );
};

export default ActionButtons;