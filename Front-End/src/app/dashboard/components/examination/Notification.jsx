import React, { useState, useEffect } from 'react';
import { Alert, Slide, Box } from '@mui/material';

// Custom notification component that doesn't use Snackbar
const Notification = ({ message, severity, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2000,
          minWidth: 300,
          maxWidth: '80%'
        }}
      >
        <Alert 
          severity={severity || 'success'} 
          variant="filled" 
          onClose={() => setVisible(false)}
          sx={{ boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)' }}
        >
          {message}
        </Alert>
      </Box>
    </Slide>
  );
};

export default Notification;