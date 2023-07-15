import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard, { DashboardRoutes } from "./components/Dashboard/Dashboard";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard/*" element={<DashboardRoutes />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
