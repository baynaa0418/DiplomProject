import Link from "next/link";
import {
  CardContent,
  Typography,
  Grid,
  Tooltip,
  Fab,
  Avatar,
  Box,
  Chip,
  LinearProgress
} from "@mui/material";
import { Stack } from "@mui/system";
import { IconPlus, IconPill, IconHeartPlus, IconEye, IconBottle } from "@tabler/icons-react";
import BlankCard from "@/app/dashboard/components/shared/BlankCard";
import DashboardCard from '@/app/dashboard/components/shared/DashboardCard';
import { useTheme } from '@mui/material/styles';

const medications = [
  {
    title: "Парацетамол",
    category: "Өвдөлт намдаагч",
    icon: <IconPill size={24} />,
    stock: 385,
    price: 2500,
    stockLevel: 75, // percentage of stock remaining
  },
  {
    title: "Амоксициллин",
    category: "Антибиотик",
    icon: <IconPill size={24} />,
    stock: 120,
    price: 3800,
    stockLevel: 35,
  },
  {
    title: "Аспирин",
    category: "Цусны бүлэгнэлт",
    icon: <IconHeartPlus size={24} />,
    stock: 250,
    price: 1800,
    stockLevel: 60,
  },
  {
    title: "Диклофенак",
    category: "Үрэвсэл намдаагч",
    icon: <IconPill size={24} />,
    stock: 90,
    price: 4200,
    stockLevel: 20,
  },
  {
    title: "Цефтриаксон",
    category: "Антибиотик",
    icon: <IconBottle size={24} />,
    stock: 75,
    price: 12000,
    stockLevel: 15,
  },
  {
    title: "Нүдний дусаалга",
    category: "Нүдний эм",
    icon: <IconEye size={24} />,
    stock: 180,
    price: 5500,
    stockLevel: 45,
  },
  {
    title: "Хлорфенамин",
    category: "Харшлын эсрэг",
    icon: <IconPill size={24} />,
    stock: 220,
    price: 1500,
    stockLevel: 55,
  },
  {
    title: "Ибупрофен",
    category: "Өвдөлт намдаагч",
    icon: <IconPill size={24} />,
    stock: 310,
    price: 3000,
    stockLevel: 65,
  },
];

const MedicationCard = ({ medication }) => {
  const theme = useTheme();
  
  // Determine stock level color
  let stockColor;
  if (medication.stockLevel < 30) {
    stockColor = theme.palette.error.main;
  } else if (medication.stockLevel < 60) {
    stockColor = theme.palette.warning.main;
  } else {
    stockColor = theme.palette.success.main;
  }
  
  return (
    <BlankCard>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                width: 45,
                height: 45,
                bgcolor: 'primary.light',
                color: 'primary.main',
              }}
            >
              {medication.icon}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {medication.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {medication.category}
              </Typography>
            </Box>
          </Stack>
          <Tooltip title="Нэмэлт захиалга">
            <Fab
              size="small"
              color="primary"
              sx={{ boxShadow: 'none' }}
            >
              <IconPlus size="18" />
            </Fab>
          </Tooltip>
        </Box>
        
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="textSecondary">
              Үлдэгдэл
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {medication.stock} ширхэг
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={medication.stockLevel} 
            sx={{ 
              height: 8, 
              borderRadius: 5,
              bgcolor: 'grey.100',
              '& .MuiLinearProgress-bar': {
                bgcolor: stockColor,
              }
            }} 
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
          <Typography variant="h6" fontWeight={700}>
            ₮{medication.price.toLocaleString()}
          </Typography>
          <Chip 
            label={
              medication.stockLevel < 30 
                ? "Бага үлдсэн" 
                : medication.stockLevel < 60 
                  ? "Дундаж" 
                  : "Хангалттай"
            } 
            size="small"
            sx={{ 
              bgcolor: `${stockColor}20`, 
              color: stockColor,
              fontWeight: 500,
            }}
          />
        </Box>
      </CardContent>
    </BlankCard>
  );
}

const AvailableMedications = () => {
  return (
    <DashboardCard 
      title="Эмийн сан" 
      subtitle="Нийт 124 төрлийн эм" 
      action={
        <Link href="/medications" passHref>
          <Typography 
            component="span" 
            color="primary" 
            sx={{ 
              cursor: 'pointer', 
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Бүгдийг харах
          </Typography>
        </Link>
      }
    >
      <Grid container spacing={3} sx={{ mt: 0 }}>
        {medications.map((medication, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MedicationCard medication={medication} />
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
};

export default AvailableMedications;