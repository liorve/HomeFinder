// src/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../NavBar";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 p-4 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
