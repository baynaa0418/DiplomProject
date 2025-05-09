import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';

const EditProfile = () => {
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    type: '',
    register: '',
    address: '',
    school: '',
    sisiID: '',
    occupation: '',
    education: '',
    birthOfDate: '',
    gender: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const res = await axios.get('/api/patients/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPatientData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile data');
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/patients/profile', patientData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={patientData.firstName}
                  onChange={handleChange}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={patientData.lastName}
                  onChange={handleChange}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={patientData.email}
                  onChange={handleChange}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={patientData.phone}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Patient Type</InputLabel>
                  <Select
                    name="type"
                    value={patientData.type}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Staff">Staff</MenuItem>
                    <MenuItem value="Teacher">Teacher</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Registration ID"
                  name="register"
                  value={patientData.register}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={patientData.address}
                  onChange={handleChange}
                  margin="normal"
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="School/Organization"
                  name="school"
                  value={patientData.school}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SISI ID"
                  name="sisiID"
                  value={patientData.sisiID}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Occupation"
                  name="occupation"
                  value={patientData.occupation}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Education"
                  name="education"
                  value={patientData.education}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="birthOfDate"
                  type="date"
                  value={patientData.birthOfDate ? patientData.birthOfDate.split('T')[0] : ''}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={patientData.gender}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
                <Button 
                  variant="outlined" 
                  sx={{ ml: 2 }}
                  onClick={() => navigate('/profile')}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfile;