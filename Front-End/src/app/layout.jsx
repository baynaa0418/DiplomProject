//src/app/layout.jsx
"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/app/dashboard/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider theme={baselightTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}