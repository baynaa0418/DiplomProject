//src/app/(DashboardLayout)/layout.jsx
"use client";
import { styled, Container, Box } from "@mui/material";
import Header from "@/app/dashboard/layout/header/Header";
import Sidebar from "@/app/dashboard/layout/sidebar/Sidebar";
import LayoutContent from "./LayoutContent";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export default function DashboardLayout({ children }) {
  return (
    <MainWrapper>
      <Sidebar />
      <PageWrapper>
        <Header />
        <Container sx={{ paddingTop: "20px", maxWidth: "1200px" }}>
          <LayoutContent>
            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          </LayoutContent>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}