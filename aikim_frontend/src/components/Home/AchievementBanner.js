import React, { useState, useEffect } from "react";
import "../../css/Home/AchievementBanner.css";

const AchievementBanner = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch('your-api-endpoint'); // Replace with your API endpoint
                // const result = await response.json();
                let result = { //dummy data
                    title: "Achievement",
                    subtitle: "Cooked for 4 days",
                    content: "You've used 80% of your food since Jan 2025.",
                }
                setData(result); // Set the API response data
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, []); // Empty dependency array to fetch data once on mount

    if (loading) {
        return <div className="loader">Loading...</div>; // Show loader while fetching data
    }

    return (
        <div className="achievement-banner">
            <div className="achievement-title">{data.title}</div>
            <div className="achievement-subtitle">{data.subtitle}</div>
            <div className="achievement-content">{data.content}</div>
        </div>
    );
};

export default AchievementBanner;
