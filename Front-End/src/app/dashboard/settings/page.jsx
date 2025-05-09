'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/dashboard/components/container/PageContainer';
import DashboardCard from '@/app/dashboard/components/shared/DashboardCard';


const Settings = () => {
  return (
    <PageContainer title="Settings" description="this is Settings">
      <DashboardCard title="Settings">
        <Typography>This is a Settings</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Settings;

