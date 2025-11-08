import Navbar from "@/components/Shared/Navbar";
import { Outlet } from "react-router";

const CommonLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default CommonLayout;
