import React, { useState } from "react";
import "../css/Sidebar.css";
import cookImage from "../assets/images/cook.svg";
import pantryImage from "../assets/images/pantry.svg";
import shopImage from "../assets/images/shop.svg";
import preferenceImage from "../assets/images/preference.svg";
import inspiredImage from "../assets/images/get_inspired.svg";

const Sidebar = ({ onMenuClick }) => {
    const [activeMenu, setActiveMenu] = useState("Cook");

    const menuItems = [
        { name: "Cook", image: cookImage },
        { name: "Pantry", image: pantryImage },
        { name: "Shop", image: shopImage },
        { name: "Preference", image: preferenceImage },
        { name: "Get Inspired", image: inspiredImage },
    ];

    const handleMenuClick = (menuName) => {
        setActiveMenu(menuName);
        onMenuClick(menuName);
    };

    return (
        <div className="sidebar">
            <div className="sidebarMenu">
                <div className="brand">AiKim</div>
                <div>
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            className={`menu ${activeMenu === item.name ? "active" : ""}`}
                            onClick={() => handleMenuClick(item.name)}
                        >
                            <img src={item.image} alt={item.name} className="styled-image" />
                            <div className="menuItem">{item.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="settings">
                <p>Setting</p>
                <p>Alex</p>
            </div>
        </div>
    );
};

export default Sidebar;