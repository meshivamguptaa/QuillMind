import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="mx-auto min-h-[calc(100vh-128px)] max-w-7xl px-6 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;