'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Avatar,
  Button,
  Divider,
  Paper,
  IconButton,
  Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter, useParams } from 'next/navigation';

export default function CustomerDetail() {
  const router = useRouter();
  const params = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [customer, setCustomer] = useState(null);

  // Sample data - in a real app, you would fetch this from an API
  const customerData = {
    1: {
      id: 1,
      name: 'Батбаяр Ариунболд',
      birthDate: '2001/07/06',
      age: 23,
      type: 'Оюутан',
      address: 'УБ, ХУД 3-р хороо Нутгийн Буян хотхон 14-р байр',
      phone: '9921 8857',
      vitalSigns: [
        { date: '2023/10/15', height: '175cm', weight: '70кг', bloodPressure: '120/80', temperature: '36.6' },
        { date: '2023/09/20', height: '175cm', weight: '68кг', bloodPressure: '118/78', temperature: '36.5' }
      ],
      medicalHistory: [
        { date: '2022/05/10', diagnosis: 'Харшил', treatment: 'Антигистамин', doctor: 'Д. Энхчимэг' },
        { date: '2021/11/15', diagnosis: 'Ханиад', treatment: 'Антибиотик', doctor: 'Д. Энхчимэг' }
      ],
      treatmentHistory: [
        { date: '2023/10/15', procedure: 'Шүдний эмчилгээ', dentist: 'Б. Ганцэцэг', notes: 'Хоёр шүд цэвэрлэлт хийсэн' },
        { date: '2023/07/22', procedure: 'Шүд суулгах', dentist: 'Б. Ганцэцэг', notes: 'Дээд 2 шүд суулгасан' }
      ],
      examinationHistory: [
        { date: '2023/10/15', type: 'Ерөнхий үзлэг', result: 'Хэвийн', doctor: 'Д. Энхчимэг' },
        { date: '2023/05/10', type: 'Шүдний рентген', result: 'Хоёр шүдэнд цооролтой', doctor: 'Б. Ганцэцэг' }
      ]
    },
    // Add other customers data here...
  };

  useEffect(() => {
    if (params?.id) {
      setCustomer(customerData[params.id]);
    }
  }, [params?.id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  const handleViewDetails = (id) => {
    router.push(`/customer/${id}`);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'white' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
        {/* Header */}
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={() => router.back()}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h4" fontWeight="600">
                Үйлчлүүлэгчийн дэлгэрэнгүй
              </Typography>
            </Box>
          </Box>
          
          {/* Customer Profile */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  bgcolor: 'primary.main',
                  fontSize: '32px',
                  fontWeight: 'medium'
                }}
              >
                {customer.name.charAt(0)}
              </Avatar>
              
              <Box>
                <Typography variant="h5" fontWeight="600">{customer.name}</Typography>
                <Typography variant="body2" color="text.secondary">{customer.type}</Typography>
                
                <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Нас</Typography>
                    <Typography>{customer.age}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Төрсөн огноо</Typography>
                    <Typography>{customer.birthDate}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Утас</Typography>
                    <Typography>{customer.phone}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Хаяг</Typography>
                    <Typography>{customer.address}</Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Paper>
          
          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Амин үзүүлэлт" />
            <Tab label="Өвчний түүх" />
            <Tab label="Эмчилгээний түүх" />
            <Tab label="Үзлэгийн түүх" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ px: 3, flexGrow: 1, overflow: 'auto' }}>
          {tabValue === 0 && (
            <Paper sx={{ p: 3, borderRadius: '12px' }}>
              <Typography variant="h6" gutterBottom>Амин үзүүлэлт</Typography>
              <Divider sx={{ mb: 2 }} />
              
              {customer.vitalSigns.length > 0 ? (
                <Box>
                  {customer.vitalSigns.map((vital, index) => (
                    <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: '8px' }}>
                      <Typography variant="subtitle2" color="text.secondary">{vital.date}</Typography>
                      <Stack direction="row" spacing={4} sx={{ mt: 1 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Өндөр</Typography>
                          <Typography>{vital.height}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Жин</Typography>
                          <Typography>{vital.weight}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Цусны даралт</Typography>
                          <Typography>{vital.bloodPressure}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Биеийн температур</Typography>
                          <Typography>{vital.temperature}°C</Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography color="text.secondary">Амин үзүүлэлтийн мэдээлэл байхгүй</Typography>
              )}
            </Paper>
          )}
          
          {tabValue === 1 && (
            <Paper sx={{ p: 3, borderRadius: '12px' }}>
              <Typography variant="h6" gutterBottom>Өвчний түүх</Typography>
              <Divider sx={{ mb: 2 }} />
              
              {customer.medicalHistory.length > 0 ? (
                <Box>
                  {customer.medicalHistory.map((history, index) => (
                    <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: '8px' }}>
                      <Typography variant="subtitle2" color="text.secondary">{history.date}</Typography>
                      <Stack direction="row" spacing={4} sx={{ mt: 1 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Онош</Typography>
                          <Typography>{history.diagnosis}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Эмчилгээ</Typography>
                          <Typography>{history.treatment}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Эмч</Typography>
                          <Typography>{history.doctor}</Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography color="text.secondary">Өвчний түүхийн мэдээлэл байхгүй</Typography>
              )}
            </Paper>
          )}
          
          {tabValue === 2 && (
            <Paper sx={{ p: 3, borderRadius: '12px' }}>
              <Typography variant="h6" gutterBottom>Эмчилгээний түүх</Typography>
              <Divider sx={{ mb: 2 }} />
              
              {customer.treatmentHistory.length > 0 ? (
                <Box>
                  {customer.treatmentHistory.map((treatment, index) => (
                    <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: '8px' }}>
                      <Typography variant="subtitle2" color="text.secondary">{treatment.date}</Typography>
                      <Stack direction="row" spacing={4} sx={{ mt: 1 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Процедур</Typography>
                          <Typography>{treatment.procedure}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Эмч</Typography>
                          <Typography>{treatment.dentist}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Тэмдэглэл</Typography>
                          <Typography>{treatment.notes}</Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography color="text.secondary">Эмчилгээний түүхийн мэдээлэл байхгүй</Typography>
              )}
            </Paper>
          )}
          
          {tabValue === 3 && (
            <Paper sx={{ p: 3, borderRadius: '12px' }}>
              <Typography variant="h6" gutterBottom>Үзлэгийн түүх</Typography>
              <Divider sx={{ mb: 2 }} />
              
              {customer.examinationHistory.length > 0 ? (
                <Box>
                  {customer.examinationHistory.map((exam, index) => (
                    <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: '8px' }}>
                      <Typography variant="subtitle2" color="text.secondary">{exam.date}</Typography>
                      <Stack direction="row" spacing={4} sx={{ mt: 1 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Үзлэгийн төрөл</Typography>
                          <Typography>{exam.type}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Үр дүн</Typography>
                          <Typography>{exam.result}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Эмч</Typography>
                          <Typography>{exam.doctor}</Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography color="text.secondary">Үзлэгийн түүхийн мэдээлэл байхгүй</Typography>
              )}
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
}