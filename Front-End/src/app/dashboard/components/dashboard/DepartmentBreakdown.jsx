import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';

import DashboardCard from '@/app/dashboard/components/shared/DashboardCard';

const DepartmentBreakdown = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const success = theme.palette.success.main;
  const error = theme.palette.error.main;
  const warning = theme.palette.warning.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, secondary, success, error, warning],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  
  // Percentage breakdown of patients by department
  const seriescolumnchart = [38, 25, 15, 12, 10];

  return (
    <DashboardCard title="Тасаг, нэгжийн харьцаа">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            1,356
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color="#39B69A" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              +12%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              өмнөх сараас
            </Typography>
          </Stack>
          <Stack spacing={3} mt={3} direction="column">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Эмчилгээний тасаг (38%)
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: secondary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Гэр бүл төлөвлөлт (25%)
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: success, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Хүүхдийн тасаг (15%)
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: error, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Мэс засал (12%)
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: warning, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Бусад (10%)
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height={180} width={"100%"}
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default DepartmentBreakdown;