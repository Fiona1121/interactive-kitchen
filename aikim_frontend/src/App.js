import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Pantry from "./components/Pantry";
import Shop from "./components/Shop";
import "./css/App.css";

const App = () => {
    const [activeMenu, setActiveMenu] = useState("Cook");

    const renderComponent = () => {
        switch (activeMenu) {
            case "Cook":
                return <Home />;
            case "Pantry":
                return <Pantry />;
            case "Shop":
                return <Shop />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="app">
            <Sidebar onMenuClick={setActiveMenu} />
            <div className="main-content">
                {renderComponent()}
            </div>
        </div>
    );
};

export default App;