import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowUpRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '@/app/dashboard/components/shared/DashboardCard';

const MonthlyRevenue = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const successlight = '#e6fffa';

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      color: primary,
      data: [25, 66, 41, 89, 63, 25, 44, 32, 36, 75, 53, 80],
    },
  ];

  return (
    <DashboardCard
      title="Сарын орлого"
      action={
        <Fab color="primary" size="medium" sx={{color: '#ffffff'}}>
          <IconCurrencyDollar width={24} />
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height={60} width={"100%"} />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          ₮18,620,500
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
            <IconArrowUpRight width={20} color="#39B69A" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +12%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            өмнөх сараас
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default MonthlyRevenue;