// src/pages/Home.jsx
import React from "react";
import AchievementBanner from "../components/Home/AchievementBanner";
import Pantry from "../components/Home/Pantry";
import Recipes from "../components/Home/Recipes";

const Home = () => {
  return (
    <div className="home-page mx-auto flex flex-col p-4 h-full">
      <AchievementBanner />
      <div className="flex flex-col md:flex-row gap-6 flex-1 max-h-[calc(100vh-200px)] overflow-hidden">
        <div className="w-full md:w-1/2">
          <Pantry />
        </div>
        <div className="w-full md:w-1/2">
          <Recipes />
        </div>
      </div>
    </div>
  );
};

export default Home;
