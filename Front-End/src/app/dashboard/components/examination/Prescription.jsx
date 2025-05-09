import React from 'react';
import { Box, Card, CardContent, Typography, Grid, TextField, Button, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const PrescriptionTab = ({ formData, onChange }) => {
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
        <Box>
          <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>Эмийн жор</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="600">Эмийн жагсаалт</Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{ 
                    borderRadius: '8px', 
                    textTransform: 'none',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  Эм нэмэх
                </Button>
              </Box>
              <Paper sx={{ 
                p: 2, 
                bgcolor: 'white', 
                borderRadius: 1, 
                border: '1px dashed #ccc',
                boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.05)'
              }}>
                <Typography color="text.secondary" align="center">
                  Одоогоор эмийн жор байхгүй байна
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Эмийн жорын тайлбар"
                name="prescriptionNotes"
                value={formData.prescriptionNotes}
                onChange={onChange}
                multiline
                rows={3}
                fullWidth
                placeholder="Эмийн жорын нэмэлт тайлбар, зөвлөгөө..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.light',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PrescriptionTab;