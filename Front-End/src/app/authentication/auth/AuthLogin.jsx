'use client';
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  MenuItem,
  Alert,
  CircularProgress,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { jwtVerify } from 'jose';
import { useAuth } from '@/app/dashboard/context/AuthContext';

const loginSchema = yup.object({
  email: yup.string().email('И-мэйл хаяг буруу байна').required('И-мэйл хаяг оруулна уу'),
  password: yup.string()
    .min(8, 'Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой')
    .required('Нууц үг оруулна уу'),
  role: yup.string().required('Эрх сонгоно уу')
});

// Туршилтын хэрэглэгчид
const demoUsers = [
  {
    email: 'patient@ex.com',
    password: 'Password123%',
    role: 'patient',
    name: 'Өвчтөн хэрэглэгч',
    redirect: '/patientProfile/customerProfile'
  },
  {
    email: 'doctor@ex.com',
    password: 'Password123%',
    role: 'doctor',
    name: 'Эмч хэрэглэгч',
    redirect: '/dashboard/home'
  }
];

export default function AuthLogin() {
  const router = useRouter();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    const checkAuth = async () => {
      const userData = localStorage.getItem('USER');
      if (userData) {
        try {
          const { token, user } = JSON.parse(userData);
          await jwtVerify(
            token,
            new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || 'default-secure-key-32-chars')
          );
          
          const demoUser = demoUsers.find(u => u.role === user.role);
          if (demoUser) router.push(demoUser.redirect);
        } catch (error) {
          localStorage.removeItem('USER');
        }
      }
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [router]);

  const handleDemoLogin = (demoUser) => {
    formik.setValues({
      email: demoUser.email,
      password: demoUser.password,
      role: demoUser.role
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: 'patient'
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        setLoginError('');
        
        // Туршилтын хэрэглэгчийн эрхийг шалгах
        const demoUser = demoUsers.find(
          user => user.email === values.email && 
                 user.password === values.password && 
                 user.role === values.role
        );

        if (demoUser) {
          // Туршилтын хэрэглэгчийн мэдээлэл үүсгэх
          const mockUser = {
            id: 'demo-' + demoUser.role,
            email: demoUser.email,
            role: demoUser.role,
            name: demoUser.name
          };

          const mockToken = 'demo-token-' + demoUser.role;

          localStorage.setItem("token", mockToken);
          localStorage.setItem("user", JSON.stringify(mockUser));
          login(mockUser, mockToken);
          
          router.push(demoUser.redirect);
          return;
        }

        // Бодит API руу хандах
        const response = await fetch(`${API_URL}/api/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            role: values.role
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 
            `Нэвтрэхэд алдаа гарлаа (код: ${response.status})`
          );
        }
        
        if (!data.accessToken || !data.user) {
          throw new Error("Хэрэглэгчийн мэдээлэл дутуу байна");
        }

        // Store auth data
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        login(data.user, data.accessToken);

        const redirectPath = data.user.role === "patient" 
          ? "/patientProfile/customerProfile" 
          : "/dashboard/home";
        router.push(redirectPath);

      } catch (error) {
        console.error('Нэвтрэх алдаа:', error);
        setLoginError(error.message);
        toast.error(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  if (isCheckingAuth) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ marginTop: 8, padding: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Нэвтрэх
        </Typography>

        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loginError}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="И-мэйл хаяг"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Нууц үг"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Эрх</InputLabel>
            <Select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              label="Эрх"
              error={formik.touched.role && !!formik.errors.role}
            >
              <MenuItem value="patient">Өвчтөн</MenuItem>
              <MenuItem value="doctor">Эмч</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{ mt: 3 }}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Нэвтрэх'}
          </Button>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            Туршилтын хэрэглэгчид:
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => handleDemoLogin(demoUsers.find(u => u.role === 'patient'))}
            >
              Өвчтөн эрхээр нэвтрэх
            </Button>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => handleDemoLogin(demoUsers.find(u => u.role === 'doctor'))}
            >
              Эмч эрхээр нэвтрэх
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}