// src/routes/config.js
import { lazy } from "react";
import React from "react";

export const DashboardPage = lazy(() => import("../pages/dashboard"));
export const BlogPage = lazy(() => import("../pages/blog"));
export const UserPage = lazy(() => import("../pages/user"));
export const SignInPage = lazy(() => import("../pages/sign-in"));
export const ProductsPage = lazy(() => import("../pages/products"));
export const Page404 = lazy(() => import("../pages/page-not-found"));

export const routesSection = [
  {
    path: "",
    children: [
      { index: true, element: React.createElement(DashboardPage) },
      { path: "user", element: React.createElement(UserPage) },
      { path: "products", element: React.createElement(ProductsPage) },
      { path: "blog", element: React.createElement(BlogPage) },
    ],
  },
  { path: "sign-in", element: React.createElement(SignInPage) },
  { path: "404", element: React.createElement(Page404) },
  { path: "*", element: React.createElement(Page404) },
];
