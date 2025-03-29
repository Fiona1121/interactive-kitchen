import React from "react";
import AchievementBanner from "./Home/AchievementBanner";
import ExpireSoon from "./Home/ExpireSoon";
import Pantry from "./Home/Pantry";
import Recipes from "./Home/Recipes";
import "../css/Home/Home.css";
const Home = () => {
    return (
        <>
            <AchievementBanner />
            <div className="content">
                <Recipes/>
                <Pantry/>
            </div>

        </>
    );
};

export default Home;