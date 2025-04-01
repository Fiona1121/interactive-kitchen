// src/components/Home/Recipes.jsx
import React, { useState, useEffect } from "react";
import { recipeService } from "../../services/api";

const RecipeCard = ({ recipe }) => {
  // Extract a simple image URL - in a real app, use the actual image from the API
  const getImageUrl = (recipeName) => {
    // Convert recipe name to kebab case for the URL
    const kebabCase = recipeName.toLowerCase().replace(/\s+/g, "-");
    return `/images/recipes/${kebabCase}.jpg`;
  };

  return (
    <div className="recipe-card">
      <div
        className="h-28 bg-cover bg-center rounded-lg overflow-hidden cursor-pointer"
        style={{
          backgroundImage: `url(${
            recipe.imageUrl || getImageUrl(recipe.recipe || recipe.title)
          })`,
        }}
      ></div>
      <h3 className="mt-1 text-sm font-medium text-gray-800 truncate">
        {recipe.recipe || recipe.title}
      </h3>
    </div>
  );
};

const RecipeSection = ({ title, recipes }) => {
  if (!recipes || recipes.length === 0) return null;

  return (
    <div className="recipe-section mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe.id || index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

const Recipes = () => {
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        // Fetch recipe suggestions from the API
        const recipeData = await recipeService.suggestRecipes();

        // In a real app, you'd have separate endpoints for recommended vs favorite recipes
        // For now, we'll split the returned recipes into two groups
        if (recipeData && recipeData.recipes) {
          // Use the first half of recipes as recommended
          const halfIndex = Math.ceil(recipeData.recipes.length / 2);
          const recommended = recipeData.recipes.slice(0, halfIndex);
          const favorites = recipeData.recipes.slice(halfIndex);

          setRecommendedRecipes(recommended);
          setFavoriteRecipes(favorites);
        }
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch real data or use mock data for development
    if (process.env.NODE_ENV === "development") {
      // Mock data for development
      setTimeout(() => {
        const mockRecommended = [
          {
            id: 1,
            recipe: "Grilled Feast Platter",
            imageUrl: "/images/recipes/grilled-feast.jpg",
          },
          {
            id: 2,
            recipe: "Fresh Salmon Sub",
            imageUrl: "/images/recipes/salmon-sub.jpg",
          },
        ];

        const mockFavorites = [
          {
            id: 3,
            recipe: "Thai Soup",
            imageUrl: "/images/recipes/thai-soup.jpg",
          },
          {
            id: 4,
            recipe: "Açaí Bowl",
            imageUrl: "/images/recipes/acai-bowl.jpg",
          },
          {
            id: 5,
            recipe: "Spicy Chicken and Peppers",
            imageUrl: "/images/recipes/spicy-chicken.jpg",
          },
          {
            id: 6,
            recipe: "Baja Fish Tacos",
            imageUrl: "/images/recipes/fish-tacos.jpg",
          },
        ];

        setRecommendedRecipes(mockRecommended);
        setFavoriteRecipes(mockFavorites);
        setLoading(false);
      }, 300);
    } else {
      fetchRecipes();
    }
  }, []);

  if (loading) {
    return (
      <div className="recipes-section animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-36 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="recipes-section p-4">
      <RecipeSection title="Try New" recipes={recommendedRecipes} />
      <RecipeSection title="My Favorite Recipes" recipes={favoriteRecipes} />
    </div>
  );
};

export default Recipes;
