"use client";
import React, { useState } from "react";
import { 
  Box, 
  Grid, 
  TextField, 
  Button, 
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";

// Mock data for departments and doctors
const departments = [
  { id: 1, name: "Нүдний тасаг" },
  { id: 2, name: "Дотрын тасаг" },
  { id: 3, name: "Мэс заслын тасаг" },
  { id: 4, name: "Шүдний тасаг" },
  { id: 5, name: "Арьс өвчний тасаг" },
];

const doctors = [
  { id: 1, name: "Б. Батболд" },
  { id: 2, name: "Н. Нарангэрэл" },
  { id: 3, name: "О. Отгонбаяр" },
  { id: 4, name: "С. Сүхбаатар" },
  { id: 5, name: "Т. Төмөрбаатар" },
];

const ReportFilter = ({ onFilterChange }) => {
  // Filter states
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");

  // Handle filter apply
  const handleApplyFilter = () => {
    onFilterChange({
      dateRange: [startDate, endDate],
      department,
      doctor,
      patientName,
      patientId
    });
  };

  // Handle filter reset
  const handleResetFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setDepartment("");
    setDoctor("");
    setPatientName("");
    setPatientId("");
    
    onFilterChange({
      dateRange: [null, null],
      department: "",
      doctor: "",
      patientName: "",
      patientId: ""
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: "100%" }}>
        <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
          <FilterAltIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />
          Шүүлтүүр
        </Typography>
        
        <Grid container spacing={2}>
          {/* Date Range */}
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="Эхлэх огноо"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth size="small" />}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small"
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="Дуусах огноо"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth size="small" />}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small"
                }
              }}
            />
          </Grid>

          {/* Department and Doctor selection */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Тасаг</InputLabel>
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                label="Тасаг"
              >
                <MenuItem value="">
                  <em>Бүгд</em>
                </MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Эмч</InputLabel>
              <Select
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                label="Эмч"
              >
                <MenuItem value="">
                  <em>Бүгд</em>
                </MenuItem>
                {doctors.map((doc) => (
                  <MenuItem key={doc.id} value={doc.id}>
                    {doc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Patient Search */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Өвчтөний нэр"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Өвчтөний ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} sm={12} md={4} sx={{ display: "flex", gap: 1, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
            <Button
              variant="outlined"
              color="primary"
              size="medium"
              startIcon={<FilterAltIcon />}
              onClick={handleApplyFilter}
            >
              Шүүх
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="medium"
              startIcon={<RestartAltIcon />}
              onClick={handleResetFilter}
            >
              Цэвэрлэх
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default ReportFilter;