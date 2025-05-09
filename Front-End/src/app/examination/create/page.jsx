"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/dashboard/context/AuthContext";

const CreateExamination = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [formData, setFormData] = useState({
    doctors_examination: "",
    exam_type: "",
    reason: "",
    sickDays: "",
    illness: "",
    surgery: "",
    patient: "",
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/api/patient/view", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Өвчтөний мэдээлэл ачаалахад алдаа гарлаа");
        }

        const result = await response.json();
        console.log("result:", result);
        if (result.patients && Array.isArray(result.patients)) {
          const formattedPatients = result.patients.map(patient => ({
            _id: patient.id,
            firstName: patient.firstname,
            lastName: patient.lastname,
            phone: patient.phoneNumber,
            email: patient.email
          }));
          setPatients(formattedPatients);
        } else {
          throw new Error("Өвчтөний мэдээлэл буруу форматаар ирлээ");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/examination/exam/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          medicalStaff: user._id,
          sickDays: parseInt(formData.sickDays),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Үзлэг бүртгэхэд алдаа гарлаа");
      }

      router.push("/examination");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Шинэ үзлэг бүртгэх
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Өвчтөн</InputLabel>
                <Select
                  name="patient"
                  value={formData.patient}
                  onChange={handleChange}
                  label="Өвчтөн"
                  required
                >
                  {loadingPatients ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Өвчтөний мэдээлэл ачааллаж байна...
                    </MenuItem>
                  ) : patients.length === 0 ? (
                    <MenuItem disabled>Өвчтөн олдсонгүй</MenuItem>
                  ) : (
                    patients.map((patient) => (
                      <MenuItem key={patient._id} value={patient._id}>
                        {patient.firstName} {patient.lastName} - {patient.phone}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Үзлэгийн төрөл</InputLabel>
                <Select
                  name="exam_type"
                  value={formData.exam_type}
                  onChange={handleChange}
                  label="Үзлэгийн төрөл"
                  required
                >
                  <MenuItem value="General">Ерөнхий</MenuItem>
                  <MenuItem value="Special">Онцгой</MenuItem>
                  <MenuItem value="Emergency">Яаралтай</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Эмчийн үзлэг</InputLabel>
                <Select
                  name="doctors_examination"
                  value={formData.doctors_examination}
                  onChange={handleChange}
                  label="Эмчийн үзлэг"
                  required
                >
                  <MenuItem value="Initial">Анхны үзлэг</MenuItem>
                  <MenuItem value="Follow-up">Дараах үзлэг</MenuItem>
                  <MenuItem value="Emergency">Яаралтай үзлэг</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Өвчин"
                name="illness"
                value={formData.illness}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Мэс засал"
                name="surgery"
                value={formData.surgery}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Өвчний хоног"
                name="sickDays"
                type="number"
                value={formData.sickDays}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Шалтгаан"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? "Бүртгэж байна..." : "Бүртгэх"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => router.push("/examination")}
                >
                  Буцах
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreateExamination; 