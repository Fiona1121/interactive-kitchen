// src/components/Home/AchievementBanner.jsx
import React, { useEffect, useState } from "react";
import { userService } from "../../services/api";

const AchievementBanner = () => {
  const [userStats, setUserStats] = useState({
    daysCooked: 0,
    foodUtilizationPercentage: 0,
    since: "Jan 2025",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        const stats = await userService.getUserStats();
        setUserStats({
          daysCooked: stats.daysCooked || 0,
          foodUtilizationPercentage: stats.foodUtilizationPercentage || 0,
          since: stats.since || "Jan 2025",
        });
      } catch (error) {
        console.error("Failed to fetch user stats:", error);
        // Use fallback data in case of error
      } finally {
        setLoading(false);
      }
    };

    // Fetch real data or use mock data for development
    if (process.env.NODE_ENV === "development") {
      // Mock data for development
      setTimeout(() => {
        setUserStats({
          daysCooked: 4,
          foodUtilizationPercentage: 88,
          since: "Jan 2025",
        });
        setLoading(false);
      }, 300);
    } else {
      fetchUserStats();
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 mb-6 animate-pulse">
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="achievement-banner w-full rounded-lg overflow-hidden mb-2 h-[20%] min-h-32">
      <div
        className="relative p-4 bg-cover bg-center h-full"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.0)), url('/images/food-background.jpg')`,
        }}
      >
        <div className="text-white flex flex-col h-full justify-between">
          <h3 className="text-base font-medium mb-1">Achievement</h3>
          <div className="flex flex-col h-full justify-end">
            <p className="text-sm font-thin">
              Cooked for{" "}
              <span className="font-bold">{userStats.daysCooked}</span> days
            </p>
            <p className="text-xl font-bold">
              You've utilized{" "}
              <span className="text-3xl">
                {userStats.foodUtilizationPercentage}%
              </span>{" "}
              of your food since {userStats.since}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBanner;
