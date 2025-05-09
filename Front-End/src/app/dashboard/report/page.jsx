"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Divider,
  Container
} from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import ReportFilter from "../components/report/ReportFilter";
import ExaminationReport from "../components/report/ExaminationReport";
import TreatmentReport from "../components/report/TreatmentReport";
import MaterialReport from "../components/report/MaterialReport";
import BreadCrumb from "../layout/shared/logo/BreadCrumb";

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ReportPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [filterValues, setFilterValues] = useState({
    dateRange: [null, null],
    department: "",
    doctor: ""
  });

  // Breadcrumb data
  const BCrumb = [
    {
      title: "Хяналтын самбар",
      href: "/",
    },
    {
      title: "Тайлан",
      href: "",
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFilterChange = (filters) => {
    setFilterValues(filters);
    // Here you would typically fetch data based on these filters
    console.log("Filters applied:", filters);
  };

  return (
    <PageContainer title="Тайлан" description="МУИС Эмнэлгийн Системийн тайлангийн хуудас">
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <BreadCrumb title="Тайлан" items={BCrumb} />

        <Paper elevation={2}>
          {/* Header */}
          <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h5" fontWeight="medium" sx={{ mb: 1 }}>
              Тайлан
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Үзлэг, эмчилгээ, материалын дэлгэрэнгүй тайлан
            </Typography>
          </Box>

          {/* Filter Section */}
          <Box sx={{ px: 3, py: 2, backgroundColor: '#f9f9f9' }}>
            <ReportFilter onFilterChange={handleFilterChange} />
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="report tabs"
            >
              <Tab label="Үзлэг" />
              <Tab label="Эмчилгээ" />
              <Tab label="Материал" />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ px: 3 }}>
            <TabPanel value={tabValue} index={0}>
              <ExaminationReport filters={filterValues} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <TreatmentReport filters={filterValues} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <MaterialReport filters={filterValues} />
            </TabPanel>
          </Box>
        </Paper>
      </Container>
    </PageContainer>
  );
};

export default ReportPage;