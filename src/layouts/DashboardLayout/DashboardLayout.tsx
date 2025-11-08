import Navbar from "@/components/Shared/Navbar";
import DashboardSidebar from "@/layouts/DashboardLayout/DashboardSidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
