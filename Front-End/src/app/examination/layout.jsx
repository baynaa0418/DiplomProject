"use client";
import { Box } from "@mui/material";
import Sidebar from "@/app/dashboard/layout/sidebar/Sidebar";
import Header from "@/app/dashboard/layout/header/Header";
import { useAuth } from "@/app/dashboard/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ExaminationLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/authentication/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Header />
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
} 