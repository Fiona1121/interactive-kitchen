// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
