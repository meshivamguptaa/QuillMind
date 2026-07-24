import { Routes, Route } from "react-router-dom";

import { ROUTES } from "../constants/routes";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/home/Home";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Blogs from "../pages/blog/Blogs";
import BlogDetails from "../pages/blog/BlogDetails";
import CreateBlog from "../pages/blog/CreateBlog";
import EditBlog from "../pages/blog/EditBlog";

import Dashboard from "../pages/dashboard/Dashboard";

import NotFound from "../pages/errors/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />

        <Route path={ROUTES.BLOGS} element={<Blogs />} />

        <Route path={ROUTES.BLOG_DETAILS} element={<BlogDetails />} />

        <Route path={ROUTES.LOGIN} element={<Login />} />

        <Route path={ROUTES.REGISTER} element={<Register />} />
      </Route>

      {/* Dashboard Routes */}
      <Route element={<DashboardLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

        <Route path={ROUTES.CREATE_BLOG} element={<CreateBlog />} />

        <Route path={ROUTES.EDIT_BLOG} element={<EditBlog />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;