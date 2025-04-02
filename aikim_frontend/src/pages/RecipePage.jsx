// src/pages/RecipePage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RecipePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipeData } = location.state || { recipeData: { recipe: [] } };
  const [selectedRecipe, setSelectedRecipe] = useState(
    recipeData.recipe?.[0] || null
  );

  if (!recipeData || !recipeData.recipe || recipeData.recipe.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">No Recipes Found</h1>
        <p className="mb-4">
          We couldn't find any recipes with the selected ingredients.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCookNow = () => {
    navigate("/recipe-detail", { state: { recipe: selectedRecipe } });
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Suggested Recipes</h1>
        <button onClick={() => navigate("/")} className="text-blue-600">
          Back to Pantry
        </button>
      </div>

      <div className="grid md:grid-cols-7 gap-6">
        <div className="md:col-span-3 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Recipes</h2>

          {recipeData.recipe.map((recipe, index) => (
            <div
              key={index}
              onClick={() => handleRecipeSelect(recipe)}
              className={`p-4 rounded-lg cursor-pointer transition ${
                selectedRecipe === recipe
                  ? "bg-blue-100 border-blue-500 border"
                  : "bg-white border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <h3 className="font-bold text-lg">{recipe.recipe}</h3>
              <p className="text-sm text-gray-600">
                {recipe.cooking_time} mins • {recipe.spicy_level} spice •{" "}
                {recipe.cuisine} cuisine
              </p>
              <p className="text-sm mt-2 text-gray-700">{recipe.overview}</p>
            </div>
          ))}
        </div>

        <div className="md:col-span-4">
          {selectedRecipe && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-4">
                {selectedRecipe.recipe}
              </h2>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Overview</h3>
                <p>{selectedRecipe.overview}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc pl-5">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>
                      {ingredient.name}: {ingredient.quantity} {ingredient.unit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Instructions</h3>
                <p className="whitespace-pre-line">
                  {selectedRecipe.instructions}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleCookNow}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
                >
                  I'm Cooking This
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
