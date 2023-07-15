import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import ThemeSettings from "./ThemeSettings";
import { useScreenState } from "../../features/stateSlice";
import Navbar from "./Navbar";
import AddDish from "../../features/addFood/AddDish";
import Menu from "../../features/MenuList/Menu";
import OrderSummary from "../../features/Orders/OrderSummary";

const Dashboard = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useScreenState();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <button
            type="button"
            onClick={() => setThemeSettings(true)}
            style={{ background: currentColor, borderRadius: "50%" }}
            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <FiSettings />
          </button>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index path="add-dish" element={<AddDish />} />
        <Route path="menu" element={<Menu />} />
        <Route path="order-summary" element={<OrderSummary />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;
export { DashboardRoutes };
