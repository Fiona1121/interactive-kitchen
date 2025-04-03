// src/pages/Home.jsx
import React, { useState } from "react";
import AchievementBanner from "../components/Home/AchievementBanner";
import Pantry from "../components/Home/Pantry";
import Recipes from "../components/Home/Recipes";
import { inventoryService } from "../services/api";

const Home = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleResetClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmReset = async () => {
    try {
      setIsResetting(true);
      await inventoryService.resetToDefault();
      alert("Inventory has been reset to default state.");
      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error("Failed to reset inventory:", error);
      alert("Error resetting inventory. Please try again.");
    } finally {
      setIsResetting(false);
      setShowConfirm(false);
    }
  };

  const handleCancelReset = () => {
    setShowConfirm(false);
  };
  return (
    <div className="home-page mx-auto flex flex-col h-full">
      <AchievementBanner />
      <div className="flex flex-col md:flex-row gap-6 flex-1 max-h-[calc(100vh-200px)] overflow-hidden">
        <div className="w-full md:w-1/2">
          <Pantry />
        </div>
        <div className="w-full md:w-1/2">
          <Recipes />
        </div>
      </div>

      {/* Invisible reset button */}
      <button
        onClick={handleResetClick}
        className="absolute bottom-4 right-4 w-16 h-16 opacity-0 hover:opacity-10"
        aria-label="Reset inventory to default state"
      />

      {/* Confirmation dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h2 className="text-xl font-bold mb-4">Reset Inventory</h2>
            <p className="mb-6">
              Are you sure you want to reset the inventory to its default state?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelReset}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isResetting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={isResetting}
              >
                {isResetting ? "Resetting..." : "Reset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
