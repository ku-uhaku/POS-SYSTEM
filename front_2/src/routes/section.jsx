// src/routes/index.jsx
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { AuthLayout } from "../layouts/auth";
import { DashboardLayout } from "@/layouts/dashboard";
import { routesSection as routesConfig } from "./config";

const renderFallback = () => (
  <Box
    sx={{
      display: "flex",
      flex: "1 1 auto",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
      }}
    />
  </Box>
);

export const routesSection = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: routesConfig[0].children,
  },
  {
    path: "sign-in",
    element: <AuthLayout>{routesConfig[1].element}</AuthLayout>,
  },
  routesConfig[2],
  routesConfig[3],
];
