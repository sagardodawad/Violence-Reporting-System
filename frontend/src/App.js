
/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ReportViolence from "./pages/ReportViolence";
import History from "./pages/History";
import AdminDashboard from "./pages/AdminDashboard";
import AboutUs from "./pages/AboutUs";
import ReportProvider from "./pages/ReportContext";
import ReportDetailsPage from "./pages/ReportDetailsPage";
import AdminReportDetails from "./pages/AdminReportDetails";
import Header from "./pages/Header";

const AppRoutes = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {userRole === "ADMIN" ? (
        <>
          <Route path="/admin/report/:id" element={<AdminReportDetails />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/admin-dashboard" />} />
        </>
      ) : (
        <>
          <Route path="/report/:id" element={<ReportDetailsPage />} />
          <Route path="/report-violence" element={<ReportViolence />} />
          <Route
            path="/history"
            element={
              <ReportProvider>
                <History />
              </ReportProvider>
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage && <Header />}
      <AppRoutes />
    </>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
