// src/app/patient/profile/PatientProfile.jsx
"use client";

import React from "react";
import { Box, Typography, Avatar, Card, CardContent } from "@mui/material";

const PatientProfile = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar 
            src={user.photoUrl} 
            sx={{ width: 80, height: 80 }} 
          />
          <Box>
            <Typography variant="h5" gutterBottom>
              {user.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {user.email}
            </Typography>
            <Typography>Утас: {user.phone || "Оруулаагүй"}</Typography>
            <Typography>Регистр: {user.regNumber || "Оруулаагүй"}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PatientProfile;