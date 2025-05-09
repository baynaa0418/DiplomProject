"use client";
import { Box } from "@mui/material";

const LayoutContent = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "background.default",
      }}
    >
      {children}
    </Box>
  );
};

export default LayoutContent; 