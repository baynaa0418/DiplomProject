"use client";
import React from "react";
import { Typography, Breadcrumbs, Link, Box, Chip } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import NextLink from "next/link";

const BreadCrumb = ({ title, items = [], ...rest }) => {
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "start", sm: "center" },
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="600"
        sx={{ mb: { xs: 1, sm: 0 } }}
      >
        {title}
      </Typography>

      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        {...rest}
      >
        <Link
          underline="hover"
          color="inherit"
          component={NextLink}
          href="/"
          sx={{
            display: "flex",
            alignItems: "center",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Нүүр
        </Link>
        {items.map((item) => {
          return (
            <div key={item.title}>
              {item.href ? (
                <Link
                  underline="hover"
                  color="inherit"
                  component={NextLink}
                  href={item.href}
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  {item.title}
                </Link>
              ) : (
                <Typography color="text.primary">{item.title}</Typography>
              )}
            </div>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadCrumb;