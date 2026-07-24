import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;