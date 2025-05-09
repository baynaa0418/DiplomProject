'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/dashboard/components/container/PageContainer';
import DashboardCard from '@/app/dashboard/components/shared/DashboardCard';


const MakeAppointment = () => {
  return (
    <PageContainer title="MakeAppointment" description="this is MakeAppointment">
      <DashboardCard title="MakeAppointment">
        <Typography>This is a MakeAppointment</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default MakeAppointment;

