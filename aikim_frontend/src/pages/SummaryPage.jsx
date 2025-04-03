// src/pages/SummaryPage.jsx
import React, { useState } from "react";

const SummaryPage = () => {
  // Dummy user data
  const [userData, setUserData] = useState({
    name: "Alex",
    joinDate: "January 15, 2025",
    totalRecipes: 42,
    favoriteCuisines: ["Italian", "Japanese", "Indian"],
    dietaryRestrictions: ["Gluten-Free"],
    mostCookedRecipe: "Mushroom Risotto",
    foodWasteSaved: "38%",
    moneySaved: "$156.20",
    totalMealsPrepared: 86,
  });

  // Dummy weekly stats
  const [weeklyStats, setWeeklyStats] = useState({
    weekStart: "March 28, 2025",
    weekEnd: "April 3, 2025",
    recipesCooked: 7,
    newIngredientsUsed: 5,
    ingredientsUsed: 24,
    moneySaved: "$38.50",
    foodWastePrevented: "2.5 kg",
  });

  // Dummy monthly trend data
  const [monthlyTrendData, setMonthlyTrendData] = useState([
    { month: "Nov", foodWaste: 25, moneySaved: 75 },
    { month: "Dec", foodWaste: 20, moneySaved: 110 },
    { month: "Jan", foodWaste: 15, moneySaved: 125 },
    { month: "Feb", foodWaste: 12, moneySaved: 140 },
    { month: "Mar", foodWaste: 8, moneySaved: 150 },
    { month: "Apr", foodWaste: 6, moneySaved: 156 },
  ]);

  // Dummy top recipes
  const [topRecipes, setTopRecipes] = useState([
    { id: 1, name: "Mushroom Risotto", count: 8, lastCooked: "2 days ago" },
    { id: 2, name: "Greek Salad", count: 6, lastCooked: "1 week ago" },
    { id: 3, name: "Teriyaki Salmon", count: 5, lastCooked: "3 days ago" },
    { id: 4, name: "Vegetable Stir-fry", count: 4, lastCooked: "5 days ago" },
    { id: 5, name: "Chicken Curry", count: 3, lastCooked: "2 weeks ago" },
  ]);

  // Dummy inventory insights
  const [inventoryInsights, setInventoryInsights] = useState([
    "You use tomatoes in 65% of your recipes",
    "Olive oil is your most frequently used ingredient",
    "You've reduced expired items by 42% since last month",
    "Consider using your chickpeas soon - they expire in 5 days",
  ]);

  // Filter options for the timeframe
  const [timeframe, setTimeframe] = useState("all");

  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    // In a real app, this would fetch new data based on the timeframe
  };

  // Function to render trend graph (simplified with colored divs representing chart bars)
  const renderTrendGraph = () => {
    const maxFoodWasteValue = Math.max(
      ...monthlyTrendData.map((item) => item.foodWaste)
    );
    const maxMoneySavedValue = Math.max(
      ...monthlyTrendData.map((item) => item.moneySaved)
    );

    return (
      <div className="mt-4">
        <div className="grid grid-cols-6 gap-2 mb-1">
          {monthlyTrendData.map((item, index) => (
            <div key={index} className="text-center text-xs text-gray-500">
              {item.month}
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className="mb-1 text-sm text-gray-600">Money Saved ($)</div>
          <div className="grid grid-cols-6 gap-2">
            {monthlyTrendData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-full bg-green-500 rounded-t"
                  style={{
                    height: `${(item.moneySaved / maxMoneySavedValue) * 100}px`,
                  }}
                ></div>
                <div className="text-xs mt-1">${item.moneySaved}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-1 text-sm text-gray-600">Food Waste (%)</div>
          <div className="grid grid-cols-6 gap-2">
            {monthlyTrendData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-full bg-red-500 rounded-t"
                  style={{
                    height: `${(item.foodWaste / maxFoodWasteValue) * 60}px`,
                  }}
                ></div>
                <div className="text-xs mt-1">{item.foodWaste}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Aikim Summary</h1>

      {/* Timeframe filter */}
      <div className="mb-6 flex justify-end">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => handleTimeframeChange("month")}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              timeframe === "month"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border border-gray-300`}
          >
            Month
          </button>
          <button
            type="button"
            onClick={() => handleTimeframeChange("quarter")}
            className={`px-4 py-2 text-sm font-medium ${
              timeframe === "quarter"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border-t border-b border-gray-300`}
          >
            Quarter
          </button>
          <button
            type="button"
            onClick={() => handleTimeframeChange("year")}
            className={`px-4 py-2 text-sm font-medium ${
              timeframe === "year"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border-t border-b border-gray-300`}
          >
            Year
          </button>
          <button
            type="button"
            onClick={() => handleTimeframeChange("all")}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              timeframe === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border border-gray-300`}
          >
            All Time
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* User overview card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold">
                Welcome back, {userData.name}!
              </h2>
              <p className="text-gray-500 text-sm">
                Aikim user since {userData.joinDate}
              </p>
            </div>
            <div className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              Food Saver
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">
              Your Cooking Profile
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm">Total Recipes</div>
                <div className="text-2xl font-bold">
                  {userData.totalRecipes}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm">Meals Prepared</div>
                <div className="text-2xl font-bold">
                  {userData.totalMealsPrepared}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm">Food Waste Saved</div>
                <div className="text-2xl font-bold text-green-600">
                  {userData.foodWasteSaved}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm">Money Saved</div>
                <div className="text-2xl font-bold text-green-600">
                  {userData.moneySaved}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-3">Your Preferences</h3>
            <div className="space-y-3">
              <div>
                <div className="text-gray-500 text-sm mb-1">
                  Favorite Cuisines
                </div>
                <div className="flex flex-wrap gap-2">
                  {userData.favoriteCuisines.map((cuisine) => (
                    <span
                      key={cuisine}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">
                  Dietary Restrictions
                </div>
                <div className="flex flex-wrap gap-2">
                  {userData.dietaryRestrictions.map((restriction) => (
                    <span
                      key={restriction}
                      className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                    >
                      {restriction}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">
                  Most Cooked Recipe
                </div>
                <div className="font-medium">{userData.mostCookedRecipe}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly stats card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">This Week's Summary</h2>
          <p className="text-gray-500 text-sm mb-4">
            {weeklyStats.weekStart} - {weeklyStats.weekEnd}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-gray-500 text-sm">Recipes Cooked</div>
              <div className="text-2xl font-bold">
                {weeklyStats.recipesCooked}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-gray-500 text-sm">New Ingredients</div>
              <div className="text-2xl font-bold">
                {weeklyStats.newIngredientsUsed}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-gray-500 text-sm">Food Waste Prevented</div>
              <div className="text-2xl font-bold text-green-600">
                {weeklyStats.foodWastePrevented}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-gray-500 text-sm">Money Saved</div>
              <div className="text-2xl font-bold text-green-600">
                {weeklyStats.moneySaved}
              </div>
            </div>
          </div>

          <h3 className="font-medium text-gray-700 mb-3">Trends Over Time</h3>
          {renderTrendGraph()}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Top recipes card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Top Recipes</h2>
          <div className="space-y-3">
            {topRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium">{recipe.name}</div>
                  <div className="text-sm text-gray-500">
                    Last cooked: {recipe.lastCooked}
                  </div>
                </div>
                <div className="text-blue-600 font-medium">{recipe.count}x</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All Recipes
            </button>
          </div>
        </div>

        {/* Inventory insights card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Insights</h2>
          <div className="space-y-3">
            {inventoryInsights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start p-3 bg-gray-50 rounded-lg"
              >
                <svg
                  className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>{insight}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">
              This Month's Achievement
            </h3>
            <div className="flex items-center">
              <svg
                className="h-10 w-10 text-yellow-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <div className="font-medium">Food Waste Warrior</div>
                <div className="text-sm text-blue-700">
                  You've reduced your food waste by over 30%!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
