// The full App.jsx should look like this:
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ScanReceiptPage from "./pages/ScanReceiptPage";
import ScanConfirmationPage from "./pages/ScanConfirmationPage";
import "./css/App.css";

// Placeholder components for other routes
const PantryPage = () => <div>Pantry Page</div>;
const ShopPage = () => <div>Shop Page</div>;
const PreferencePage = () => <div>Preference Page</div>;
const InspirePage = () => <div>Get Inspired Page</div>;
const SummaryPage = () => <div>Aikim Summary Page</div>;
const SettingsPage = () => <div>Settings Page</div>;
const ProfilePage = () => <div>Profile Page</div>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="pantry" element={<PantryPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="preference" element={<PreferencePage />} />
          <Route path="inspire" element={<InspirePage />} />
          <Route path="summary" element={<SummaryPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="/scan-receipt" element={<ScanReceiptPage />} />
          <Route path="/scan-confirmation" element={<ScanConfirmationPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
