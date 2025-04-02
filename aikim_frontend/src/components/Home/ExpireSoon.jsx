import React from "react";
import "../../css/Home/ExpireSoon.css";

const ExpireSoon = () => {
    const items = [
        { name: "Cucumber", color: "#E8F6E9" },
        { name: "Tomato", color: "#FDECEF" },
        { name: "Red Onion", color: "#FFF6E0" },
    ];

    return (
        <div className="expire-soon">
            <h3>Expire Soon <span>Expiring in 3 days</span></h3>
            <div className="expire-items">
                {items.map((item, index) => (
                    <div key={index} className="expire-item" style={{ backgroundColor: item.color }}>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
            <button className="generate-recipe-button">Generate Recipe</button>
        </div>
    );
};

export default ExpireSoon;
