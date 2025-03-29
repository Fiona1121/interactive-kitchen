import React, { useState, useEffect } from "react";
import "../../css/Home/Pantry.css";

const Pantry = () => {
    const [pantryItems, setPantryItems] = useState([]);

    useEffect(() => {
        // Replace with your actual API endpoint when it's live
        const fetchPantryItems = async () => {
            try {
                // API call placeholder (replace with actual endpoint)
                // const response = await fetch("https://api.example.com/pantry");
                // const data = await response.json();

                // Dummy data for testing
                const data = [
                    { name: "Avocados", quantity: "2 pc", checked: true },
                    { name: "Spinach", quantity: "Spinach", checked: false },
                    { name: "Cheese", quantity: "2 pc", checked: false },
                    { name: "Salmon fillets", quantity: "2 x 150g", checked: true },
                    { name: "Potatoes", quantity: "200 g", checked: false },
                    { name: "Beef", quantity: "500 g", checked: false },
                    { name: "Eggs", quantity: "12 pc", checked: false },
                    { name: "Tofu", quantity: "1 pc", checked: false },
                ];

                // Use fetched data
                setPantryItems(data);
            } catch (error) {
                console.error("Error fetching pantry items:", error);
            }
        };

        fetchPantryItems();
    }, []);

    return (
        <div className="pantry">
            <h3>Pantry <span>Current</span></h3>
            <div className="pantry-items">
                {pantryItems.map((item, index) => (
                    <div key={index} className="pantry-item">
                        <span>{item.name}</span>
                        <span>{item.quantity}</span>
                        <input type="checkbox" defaultChecked={item.checked} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pantry;