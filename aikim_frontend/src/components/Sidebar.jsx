// src/components/Sidebar.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/Sidebar.css";
import logoImage from "../assets/images/aikim-logo.png";
import cookImage from "../assets/images/cook.svg";
import pantryImage from "../assets/images/pantry.svg";
import shopImage from "../assets/images/shop.svg";
import preferenceImage from "../assets/images/preference.svg";
import inspiredImage from "../assets/images/get_inspired.svg";
import summaryImage from "../assets/images/summary.svg";
import settingImage from "../assets/images/setting.svg";
import userImage from "../assets/images/user.svg";

const Sidebar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Function to determine active menu based on current path
  const getActiveMenu = () => {
    if (path === "/" || path === "/cook") return "Cook";
    if (path === "/pantry") return "Pantry";
    if (path === "/shop") return "Shop";
    if (path === "/preference") return "Preference";
    if (path === "/inspire") return "Get Inspired";
    if (path === "/summary") return "Aikim summary";
    if (path === "/settings") return "Setting";
    if (path === "/profile") return "Alex";
    return "None"; // Default
  };

  const [activeMenu, setActiveMenu] = useState(getActiveMenu());

  const menuItems = [
    { name: "Cook", image: cookImage, path: "/" },
    { name: "Pantry", image: pantryImage, path: "/pantry" },
    { name: "Shop", image: shopImage, path: "/shop" },
    { name: "Preference", image: preferenceImage, path: "/preference" },
    { name: "Get Inspired", image: inspiredImage, path: "/inspire" },
    { name: "Aikim summary", image: summaryImage, path: "/summary" },
  ];

  const bottomItems = [
    { name: "Setting", image: settingImage, path: "/settings" },
    { name: "Alex", image: userImage, path: "/profile" },
  ];

  const handleMenuClick = (menuName, menuPath) => {
    setActiveMenu(menuName);
    navigate(menuPath);
    if (onMenuClick) {
      onMenuClick(menuName);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebarMenu">
        <div className="brand">
          <img src={logoImage} alt="AiKim Logo" className="brand" />
        </div>
        <div>
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`menu ${activeMenu === item.name ? "active" : ""}`}
              onClick={() => handleMenuClick(item.name, item.path)}
            >
              <img src={item.image} alt={item.name} className="styled-image" />
              <div className="menuItem">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="settings">
        {bottomItems.map((item) => (
          <div
            key={item.name}
            className={`menu ${activeMenu === item.name ? "active" : ""}`}
            onClick={() => handleMenuClick(item.name, item.path)}
          >
            <img src={item.image} alt={item.name} className="styled-image" />
            <div className="menuItem">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
