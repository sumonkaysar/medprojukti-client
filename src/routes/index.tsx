import CommonLayout from "@/layouts/CommonLayout";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DepartmentManagement from "@/pages/Dashboard/DepartmentManagement";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: CommonLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "department",
        Component: DepartmentManagement,
      },
    ],
  },
  // {
  //   path: "*",
  //   Component: NotFound,
  // },
]);

export default router;
