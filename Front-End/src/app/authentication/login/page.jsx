"use client";
import React from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/dashboard/components/container/PageContainer";
import LoginInfo from "@/app/dashboard/components/login/LoginInfo";
import AuthLogin from "../auth/AuthLogin";

const Login2 = () => {
  return (
    <PageContainer title="Login" description="This is the login page">
      {/* Two-column layout filling the full viewport height */}
      <Grid container sx={{ height: "100vh" }}>
        {/* LEFT side: White background for doctor + bullet points */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoginInfo />
        </Grid>

        {/* RIGHT side: Gray background with NO white box/card */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: "#F5F5F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Instead of a <Card>, use a simple Box (transparent background) */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 500,
              p: { xs: 3, sm: 4 },
            }}
          >
            <AuthLogin />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Login2;
