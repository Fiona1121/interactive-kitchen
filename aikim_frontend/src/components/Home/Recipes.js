import React, { useState, useEffect } from "react";
import "../../css/Home/Recipes.css";

const Recipes = () => {
    const [favRecipes, setFavRecipes] = useState([]);
    const [tryNew, setTryNew] = useState([]);

    useEffect(() => {
        // Replace with your actual API endpoint when it's live
        const fetchRecipes = async () => {
            try {
                // API call placeholder (replace with actual endpoint)
                // const response = await fetch("https://api.example.com/recipes");
                // const data = await response.json();

                // Dummy data for testing
                const data = {
                    favRecipes: [
                        { name: "Thai Soup", image: "https://dummyimage.com/216x115/000/fff" },
                        { name: "Creamy Chicken Alfredo", image: "https://dummyimage.com/216x115/000/fff" },
                        { name: "Spicy Chicken and Peppers", image: "https://dummyimage.com/216x115/000/fff" },
                        { name: "Pesto Pasta Delight", image: "https://dummyimage.com/216x115/000/fff" }
                    ],
                    tryNew: [
                        { name: "Grilled Feast Platter", image: "https://dummyimage.com/216x115/000/fff" },
                        { name: "Fresh Veggie Sub", image: "https://dummyimage.com/216x115/000/fff" }
                    ]
                };

                // Use fetched data
                setFavRecipes(data.favRecipes);
                setTryNew(data.tryNew);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div className="recipes">
            <div className="favorite-recipes try-new">
                <h3>Try New</h3>
                <div className="recipes-list">
                    {tryNew.map((recipe, index) => (
                        <div key={index} className="recipe">
                            <img src={recipe.image} alt={recipe.name} />
                            <div className='recipe-name'>{recipe.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="favorite-recipes">
                <h3>My Favorite Recipes</h3>
                <div className="recipes-list">
                    {favRecipes.map((recipe, index) => (
                        <div key={index} className="recipe">
                            <img src={recipe.image} alt={recipe.name} />
                            <div className='recipe-name'>{recipe.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Recipes;