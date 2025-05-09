'use client'
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from '@/app/dashboard/components/container/PageContainer';
// components
import { useAuth } from '../context/AuthContext';
import PatientOverview from '../components/dashboard/PatientOverview';
import DepartmentBreakdown from '../components/dashboard/DepartmentBreakdown';
import MonthlyRevenue from '../components/dashboard/MonthlyRevenue';
import RecentAppointments from '../components/dashboard/recentAppointment';
import StaffPerformance from '../components/dashboard/StaffPerformance';
import AvailableMedications from '../components/dashboard/AvailableMed';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <PageContainer title="Эмнэлгийн хяналтын самбар" description="Hospital Dashboard">
      <Box sx={{ pt: 2, pb: 4 }}>
        <Typography variant="h4" fontWeight="600" sx={{ mb: 4 }}>
          Эмнэлгийн хяналтын самбар
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <PatientOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DepartmentBreakdown />
              </Grid>
              <Grid item xs={12}>
                <MonthlyRevenue />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentAppointments />
          </Grid>
          <Grid item xs={12} lg={8}>
            <StaffPerformance />
          </Grid>
          <Grid item xs={12}>
            <AvailableMedications />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}