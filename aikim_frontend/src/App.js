// The full App.jsx should look like this:
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ScanReceiptPage from "./pages/ScanReceiptPage";
import ScanConfirmationPage from "./pages/ScanConfirmationPage";
import RecipePage from "./pages/RecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import "./css/App.css";
import PantryPage from "./pages/PantryPage";
import ShopPage from "./pages/ShopPage";
import InspirePage from "./pages/InspiredPage";
import PreferencePage from "./pages/PreferencePage";
import SummaryPage from "./pages/SummaryPage";

// Placeholder components for other routes
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
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/recipe-detail" element={<RecipeDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
