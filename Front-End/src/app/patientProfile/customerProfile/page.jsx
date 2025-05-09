'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Divider,
  Stack,
  Menu,
  MenuItem,
  IconButton,
  TextField,
  Button,
  Container
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter, useParams } from 'next/navigation';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useAuth } from '@/app/dashboard/context/AuthContext';
import { toast } from 'react-toastify';

// Динамик mock data-г localStorage-д хадгална
function getDynamicCustomerData(user) {
  const key = `PATIENT_PROFILE_${user.id}`;
  let data = localStorage.getItem(key);
  if (data) return JSON.parse(data);

  // Random data generators
  const getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
  };

  const getRandomDoctor = () => {
    const doctors = [
      'Нямжав Наранчимэг',
      'Батболд Дэлгэрцэцэг',
      'Батболд Эрдэнэ',
      'Д. Энхчимэг',
      'Б. Ганцэцэг'
    ];
    return doctors[Math.floor(Math.random() * doctors.length)];
  };

  const getRandomDiagnosis = () => {
    const diagnoses = [
      'A01.1 - A ижбанадад',
      'A04.8 - Үүсгэгч нь тогтоогдоогүй гэдэсний бусад бактери халдвар',
      'A01.3 - C ижбанадад',
      'K02.0 - Шүдний цоорхой',
      'K05.0 - Цус харвалттай гингивит',
      'K06.0 - Чийгшүүлэлт',
      'K08.0 - Шүдний эрт уналт',
      'K12.0 - Амны хөндийн халдвар',
      'K13.0 - Амны хөндийн бусад өвчин'
    ];
    return diagnoses[Math.floor(Math.random() * diagnoses.length)];
  };

  const getRandomProcedure = () => {
    const procedures = [
      'Z-40 - Шүдний цэвэрлэлт',
      'Z-18 - Шүдний оношлогоо',
      'Z-25 - Шүдний эмчилгээ',
      'Z-30 - Шүдний хамгаалалт',
      'Z-35 - Шүдний засвар',
      'Z-45 - Шүдний суулгац',
      'Z-50 - Шүдний хагалгаа'
    ];
    return procedures[Math.floor(Math.random() * procedures.length)];
  };

  const getRandomStatus = () => {
    const statuses = ['Дууссан', 'Хийгдэж буй', 'Хүлээгдэж буй'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getRandomTreatment = () => {
    const treatments = [
      {
        name: 'Дуслын эмчилгээ',
        details: 'Глюкозын 5%-ийн уусмал 500мл, витамин Б цогцолбор',
        duration: '30 минут',
        frequency: 'Өдөрт 1 удаа',
        days: '3 өдөр',
        status: 'Хийгдэж буй'
      },
      {
        name: 'Антибиотик эмчилгээ',
        details: 'Амоксициллин 500мг',
        duration: '7 хоног',
        frequency: 'Өдөрт 3 удаа',
        days: '7 өдөр',
        status: 'Дууссан'
      },
      {
        name: 'Шүдний цэвэрлэлт',
        details: 'Профессионал цэвэрлэлт, фторжуулалт',
        duration: '45 минут',
        frequency: '6 сард 1 удаа',
        days: '1 өдөр',
        status: 'Хүлээгдэж буй'
      }
    ];
    return treatments[Math.floor(Math.random() * treatments.length)];
  };

  // Generate random medical history
  const generateMedicalHistory = (count) => {
    const history = [];
    for (let i = 0; i < count; i++) {
      const treatment = getRandomTreatment();
      history.push({
        date: getRandomDate(new Date('2023-01-01'), new Date()),
        doctor: getRandomDoctor(),
        examination: {
          type: Math.random() > 0.5 ? 'Анхан' : 'Давтан',
          diagnosis: getRandomDiagnosis(),
          procedure: getRandomProcedure(),
          status: getRandomStatus()
        },
        treatment: {
          name: treatment.name,
          details: treatment.details,
          duration: treatment.duration,
          frequency: treatment.frequency,
          days: treatment.days,
          status: treatment.status
        }
      });
    }
    return history;
  };

  // Generate random examination history
  const generateExaminationHistory = (count) => {
    const history = [];
    for (let i = 0; i < count; i++) {
      history.push({
        date: getRandomDate(new Date('2023-01-01'), new Date()),
        doctor: getRandomDoctor(),
        type: Math.random() > 0.5 ? 'Анхан' : 'Давтан',
        diagnosis: getRandomDiagnosis(),
        procedure: getRandomProcedure(),
        status: getRandomStatus()
      });
    }
    return history;
  };

  const initial = {
    id: user.id,
    name: (user.lastName && user.firstName) ? `${user.lastName} ${user.firstName}` : 'Нэр оруулаагүй',
    birthDate: user.birthDate || '2001/07/06',
    age: user.age || 23,
    type: user.type || 'Оюутан',
    address: user.address || 'УБ,ХУД 3-р хороо, Нутгийн Буян хотхон 14-р байр',
    phone: user.phone || '9911-0000',
    vitalSigns: [
      { 
        date: getRandomDate(new Date('2023-01-01'), new Date()),
        height: '175см',
        weight: '70кг',
        bloodPressure: '120/80',
        temperature: '36.6',
        pulse: '72',
        bloodSugar: '5.2'
      }
    ],
    medicalHistory: generateMedicalHistory(5),
    treatmentHistory: [
      { 
        date: getRandomDate(new Date('2023-01-01'), new Date()),
        procedure: 'Дуслын эмчилгээ',
        details: 'Глюкозын 5%-ийн уусмал 500мл, витамин Б цогцолбор',
        duration: '30 минут',
        frequency: 'Өдөрт 1 удаа',
        days: '3 өдөр',
        status: 'Хийгдэж буй',
        dentist: getRandomDoctor()
      },
      {
        date: getRandomDate(new Date('2023-01-01'), new Date()),
        procedure: 'Антибиотик эмчилгээ',
        details: 'Амоксициллин 500мг',
        duration: '7 хоног',
        frequency: 'Өдөрт 3 удаа',
        days: '7 өдөр',
        status: 'Дууссан',
        dentist: getRandomDoctor()
      }
    ],
    examinationHistory: generateExaminationHistory(5)
  };
  localStorage.setItem(key, JSON.stringify(initial));
  return initial;
}

function setDynamicCustomerData(user, data) {
  const key = `PATIENT_PROFILE_${user.id}`;
  localStorage.setItem(key, JSON.stringify(data));
}

export default function PatientProfile() {
  const router = useRouter();
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [customer, setCustomer] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const pdfRef = useRef();

  useEffect(() => {
    if (user === null) return;
    if (!user) {
      router.push('/patientProfile/customerProfile');
    } else if (user.role !== 'patient') {
      router.push('/unauthorized');
    }
  }, [user, router]);

  useEffect(() => {
    if (user?.role === 'patient') {
      const data = getDynamicCustomerData(user);
      setCustomer(data);
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const downloadPDF = async () => {
    handleMenuClose();
    const input = pdfRef.current;
    const canvas = await html2canvas(input, { 
      scale: 2, 
      useCORS: true, 
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${customer.name}_profile.pdf`);
  };

  const renderTabContent = () => {
    if (!customer) return null;
    
    const tabRenderers = [
      {
        title: 'Амин үзүүлэлт',
        data: customer.vitalSigns,
        fields: [
          { label: 'Өндөр', key: 'height', width: '16.66%' },
          { label: 'Жин', key: 'weight', width: '16.66%' },
          { label: 'Цусны даралт', key: 'bloodPressure', width: '16.66%' },
          { label: 'Биеийн температур', key: 'temperature', suffix: '°C', width: '16.66%' },
          { label: 'Зүрхний цохилт', key: 'pulse', suffix: '/мин', width: '16.66%' },
          { label: 'Цусны сахар', key: 'bloodSugar', suffix: 'mmol/L', width: '16.66%' }
        ]
      },
      {
        title: 'Өвчний түүх',
        data: customer.medicalHistory,
        fields: [
          { label: 'Огноо', key: 'date', width: '12%' },
          { label: 'Эмч', key: 'doctor', width: '12%' },
          { 
            label: 'Үзлэг',
            key: 'examination',
            width: '38%',
            render: (value) => {
              if (!value) return null;
              return (
                <Box sx={{ width: '100%' }}>
                  <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: '25%' }}>
                      Төрөл: {value.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ width: '35%' }}>
                      Онош: {value.diagnosis}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ width: '20%' }}>
                      Ажилбар: {value.procedure}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ width: '20%' }}>
                      Төлөв: {value.status}
                    </Typography>
                  </Stack>
                </Box>
              );
            }
          },
          {
            label: 'Эмчилгээ',
            key: 'treatment',
            width: '38%',
            render: (value) => {
              if (!value) return null;
              return (
                <Box sx={{ width: '100%' }}>
                  <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: '20%' }}>
                      Нэр: {value.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ width: '30%' }}>
                      Дэлгэрэнгүй: {value.details}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ width: '15%' }}>
                      Хугацаа: {value.duration}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ width: '15%' }}>
                      Давтамж: {value.frequency}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ width: '10%' }}>
                      Өдөр: {value.days}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ width: '10%' }}>
                      Төлөв: {value.status}
                    </Typography>
                  </Stack>
                </Box>
              );
            }
          }
        ]
      },
      {
        title: 'Эмчилгээний түүх',
        data: customer.treatmentHistory,
        fields: [
          { label: 'Огноо', key: 'date', width: '12%' },
          { label: 'Эмчилгээ', key: 'procedure', width: '15%' },
          { label: 'Дэлгэрэнгүй', key: 'details', width: '25%' },
          { label: 'Хугацаа', key: 'duration', width: '12%' },
          { label: 'Давтамж', key: 'frequency', width: '12%' },
          { label: 'Өдөр', key: 'days', width: '12%' },
          { label: 'Төлөв', key: 'status', width: '12%' }
        ]
      },
      {
        title: 'Үзлэгийн түүх',
        data: customer.examinationHistory,
        fields: [
          { label: 'Огноо', key: 'date', width: '15%' },
          { label: 'Эмч', key: 'doctor', width: '15%' },
          { label: 'Үзлэгийн төрөл', key: 'type', width: '15%' },
          { label: 'Онош', key: 'diagnosis', width: '25%' },
          { label: 'Ажилбар', key: 'procedure', width: '15%' },
          { label: 'Төлөв', key: 'status', width: '15%' }
        ]
      }
    ];

    const { title, data, fields } = tabRenderers[tabValue];

    const filteredData = data.filter(entry => {
      if (!entry) return false;
      return Object.entries(entry).some(([key, value]) => {
        if (value === null || value === undefined) return false;
        if (typeof value === 'object') {
          return Object.values(value).some(v => 
            v && v.toString().toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
      });
    });

    return (
      <>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Divider sx={{ mb: 2 }} />
        
        <TextField
          label="Хайх"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ 
            mb: 3, 
            width: '100%',
            '& .MuiOutlinedInput-root': {
              width: '100%'
            }
          }}
          InputProps={{
            endAdornment: searchQuery && (
              <IconButton onClick={() => setSearchQuery('')}>
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
        
        {filteredData.length > 0 ? (
          filteredData.map((entry, index) => (
            <Box 
              key={index} 
              sx={{ 
                mb: 3, 
                p: 2, 
                border: '1px solid #eee', 
                borderRadius: '8px',
                width: '100%'
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">{entry.date}</Typography>
              <Stack 
                direction="row" 
                spacing={2} 
                sx={{ 
                  mt: 1,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start'
                }}
              >
                {fields.map((field, i) => (
                  <Box 
                    key={i} 
                    sx={{ 
                      width: field.width || 'auto', 
                      minWidth: '100px',
                      flex: field.width ? 'none' : 1
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">{field.label}</Typography>
                    {field.render ? (
                      field.render(entry[field.key])
                    ) : (
                      <Typography>
                        {entry[field.key] || '-'}
                        {field.suffix || ''}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>
          ))
        ) : (
          <Typography color="text.secondary">Мэдээлэл байхгүй</Typography>
        )}
      </>
    );
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        p: { xs: 1, sm: 2 },
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ mb: 2 }}>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" gutterBottom>Өвчтөний дэлгэрэнгүй</Typography>
      </Box>

      <Box 
        ref={pdfRef} 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #eee',
          borderRadius: '8px',
          p: { xs: 1, sm: 2 },
          backgroundColor: 'background.paper'
        }}
      >
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{ mb: 2 }}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{
            style: {
              backgroundColor: 'primary.main'
            }
          }}
        >
          <Tab label="Амин үзүүлэлт" />
          <Tab label="Өвчний түүх" />
          <Tab label="Эмчилгээний түүх" />
          <Tab label="Үзлэгийн түүх" />
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <IconButton onClick={handleMenuOpen}>
              <PictureAsPdfIcon />
            </IconButton>
          </Box>
        </Tabs>

        <Menu 
          anchorEl={anchorEl} 
          open={Boolean(anchorEl)} 
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={downloadPDF}>PDF татах</MenuItem>
        </Menu>

        {customer && (
          <Box sx={{ 
            mb: 3, 
            p: 2, 
            border: '1px solid #eee', 
            borderRadius: '8px'
          }}>
            <Typography variant="h6" gutterBottom>Үндсэн мэдээлэл</Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" spacing={4} sx={{ mt: 1, flexWrap: 'wrap' }}>
              <Box sx={{ width: { xs: '100%', sm: '45%' }, mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Нэр</Typography>
                <Typography>{customer.name}</Typography>
              </Box>
              <Box sx={{ width: { xs: '100%', sm: '45%' }, mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Төрсөн огноо</Typography>
                <Typography>{customer.birthDate}</Typography>
              </Box>
              <Box sx={{ width: { xs: '100%', sm: '45%' }, mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Нас</Typography>
                <Typography>{customer.age}</Typography>
              </Box>
              <Box sx={{ width: { xs: '100%', sm: '45%' }, mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Төрөл</Typography>
                <Typography>{customer.type}</Typography>
              </Box>
              <Box sx={{ width: { xs: '100%', sm: '45%' }, mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Утас</Typography>
                <Typography>{customer.phone}</Typography>
              </Box>
              <Box sx={{ width: { xs: '100%', sm: '100%' }, mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Хаяг</Typography>
                <Typography>{customer.address}</Typography>
              </Box>
            </Stack>
          </Box>
        )}

        <Box sx={{ 
          flex: 1,
          overflowY: 'auto',
          pb: 2
        }}>
          {renderTabContent()}
        </Box>
      </Box>
    </Container>
  );
}