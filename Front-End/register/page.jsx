"use client";
import { Grid, Box, Card, Typography, Stack } from "@mui/material";
import Link from "next/link";
import PageContainer from "@/app/dashboard/components/container/PageContainer";
import Logo from "@/app/dashboard/layout/shared/logo/Logo";
import AuthRegister from "../auth/AuthRegister";

const Register2 = () => (
  <PageContainer title="Register" description="This is the Register page">
    <Box
  sx={{
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#F5F5F5", // sets the background color
    // Remove or update the pseudo-element if not needed:
    "&:before": {
      content: '""',
      backgroundColor: "#F5F5F5", // same color as main background
      position: "absolute",
      height: "100%",
      width: "100%",
      zIndex: -1,
    },
  }}
>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6} xl={7}>
          <Card
            elevation={9}
            sx={{
              m: 2,
              p: 2.5,
              zIndex: 1,
              width: "100%",
              maxWidth: "500px",
              mx: "auto",
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>

            <AuthRegister
              subtext={
                <Box textAlign="center" mb={1}>
                  <Typography component="div" variant="subtitle1" color="textSecondary">
                    Эрүүл Багш, Эрүүл Оюутан, Эрүүл Ажилтан
                  </Typography>
                </Box>
              }
              subtitle={
                <Box mt={3} textAlign="center">
                  <Stack direction="row" justifyContent="center" spacing={1}>
                    <Typography component="span" color="textSecondary" variant="h6" fontWeight="400">
                      Бүртгэлтэй юу?
                    </Typography>
                    <Typography
                      component={Link}
                      href="/authentication/login"
                      fontWeight="500"
                      variant="h6"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                    >
                      Нэвтрэх
                    </Typography>
                  </Stack>
                </Box>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default Register2;
