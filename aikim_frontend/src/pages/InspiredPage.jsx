// src/pages/InspirePage.jsx
import React, { useState } from "react";

const InspirePage = () => {
  // Dummy recommended recipes
  const [recommendedRecipes, setRecommendedRecipes] = useState([
    {
      id: 1,
      title: "Mushroom Risotto",
      description:
        "Creamy Italian rice dish with sautéed mushrooms and parmesan",
      difficulty: "Medium",
      cookingTime: 40,
      calories: 450,
      imageUrl: "https://source.unsplash.com/random/300x200/?risotto",
      tags: ["Italian", "Vegetarian", "Dinner"],
    },
    {
      id: 2,
      title: "Greek Salad",
      description:
        "Fresh Mediterranean salad with feta cheese, olives, and olive oil dressing",
      difficulty: "Easy",
      cookingTime: 15,
      calories: 320,
      imageUrl: "https://source.unsplash.com/random/300x200/?greek-salad",
      tags: ["Greek", "Vegetarian", "Lunch", "Quick"],
    },
    {
      id: 3,
      title: "Teriyaki Salmon",
      description:
        "Pan-seared salmon glazed with sweet and savory teriyaki sauce",
      difficulty: "Easy",
      cookingTime: 25,
      calories: 380,
      imageUrl: "https://source.unsplash.com/random/300x200/?salmon",
      tags: ["Japanese", "Seafood", "Dinner", "High-Protein"],
    },
  ]);

  // Dummy weekly meal plan
  const [mealPlan, setMealPlan] = useState([
    {
      day: "Monday",
      meals: {
        breakfast: "Avocado Toast with Eggs",
        lunch: "Quinoa Salad with Roasted Vegetables",
        dinner: "Grilled Chicken with Sweet Potato",
      },
    },
    {
      day: "Tuesday",
      meals: {
        breakfast: "Greek Yogurt with Honey and Berries",
        lunch: "Lentil Soup with Whole Grain Bread",
        dinner: "Baked Salmon with Asparagus",
      },
    },
    {
      day: "Wednesday",
      meals: {
        breakfast: "Overnight Oats with Fruits",
        lunch: "Chicken Wrap with Hummus",
        dinner: "Vegetable Stir-fry with Tofu",
      },
    },
    {
      day: "Thursday",
      meals: {
        breakfast: "Smoothie Bowl with Granola",
        lunch: "Mediterranean Chickpea Salad",
        dinner: "Turkey Chili with Brown Rice",
      },
    },
    {
      day: "Friday",
      meals: {
        breakfast: "Whole Grain Pancakes with Maple Syrup",
        lunch: "Tuna Salad Sandwich",
        dinner: "Homemade Pizza with Vegetables",
      },
    },
    {
      day: "Saturday",
      meals: {
        breakfast: "Eggs Benedict",
        lunch: "Caprese Salad with Balsamic Glaze",
        dinner: "Grilled Steak with Roasted Vegetables",
      },
    },
    {
      day: "Sunday",
      meals: {
        breakfast: "Frittata with Mixed Vegetables",
        lunch: "Poke Bowl with Brown Rice",
        dinner: "Mushroom Risotto",
      },
    },
  ]);

  // Dummy seasonal ingredients
  const [seasonalIngredients, setSeasonalIngredients] = useState([
    {
      name: "Asparagus",
      season: "Spring",
      imageUrl: "https://source.unsplash.com/random/100x100/?asparagus",
    },
    {
      name: "Strawberries",
      season: "Spring",
      imageUrl: "https://source.unsplash.com/random/100x100/?strawberries",
    },
    {
      name: "Tomatoes",
      season: "Summer",
      imageUrl: "https://source.unsplash.com/random/100x100/?tomatoes",
    },
    {
      name: "Zucchini",
      season: "Summer",
      imageUrl: "https://source.unsplash.com/random/100x100/?zucchini",
    },
    {
      name: "Pumpkin",
      season: "Fall",
      imageUrl: "https://source.unsplash.com/random/100x100/?pumpkin",
    },
    {
      name: "Apples",
      season: "Fall",
      imageUrl: "https://source.unsplash.com/random/100x100/?apples",
    },
  ]);

  // Dummy cooking tips
  const [cookingTips, setCookingTips] = useState([
    {
      id: 1,
      title: "Perfect Pasta Every Time",
      content:
        "Always salt your pasta water generously. It should taste like the sea. This is your only chance to season the pasta itself.",
    },
    {
      id: 2,
      title: "Chopping Onions Without Tears",
      content:
        "Chill onions in the refrigerator for 30 minutes before cutting to reduce the tear-inducing compounds.",
    },
    {
      id: 3,
      title: "Get More Juice from Citrus",
      content:
        "Roll lemons or limes on the counter with firm pressure before juicing to break down the cells and get more juice.",
    },
  ]);

  // State for active tab
  const [activeTab, setActiveTab] = useState("recommended");

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle recipe click
  const handleRecipeClick = (recipeId) => {
    alert(`Viewing recipe ${recipeId}`);
    // Navigate to recipe detail page
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Get Inspired</h1>

      {/* Tab navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === "recommended"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("recommended")}
            >
              Recommended Recipes
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === "mealplan"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("mealplan")}
            >
              Weekly Meal Plan
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === "seasonal"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("seasonal")}
            >
              Seasonal Ingredients
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === "tips"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("tips")}
            >
              Cooking Tips
            </button>
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Recommended Recipes Tab */}
        {activeTab === "recommended" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recipes You Might Like</h2>
              <button className="text-blue-600 hover:text-blue-800">
                View All Recipes
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {recommendedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleRecipeClick(recipe.id)}
                >
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${recipe.imageUrl})` }}
                  ></div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1">{recipe.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {recipe.description}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>
                        {recipe.difficulty} • {recipe.cookingTime} mins
                      </span>
                      <span>{recipe.calories} kcal</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {recipe.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Discover More Recipes
              </button>
            </div>
          </div>
        )}

        {/* Weekly Meal Plan Tab */}
        {activeTab === "mealplan" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Weekly Meal Plan</h2>
              <div>
                <button className="text-blue-600 hover:text-blue-800 mr-4">
                  Regenerate Plan
                </button>
                <button className="text-green-600 hover:text-green-800">
                  Add to Shopping List
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Day
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Breakfast
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Lunch
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Dinner
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mealPlan.map((day) => (
                    <tr key={day.day} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {day.day}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {day.meals.breakfast}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {day.meals.lunch}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {day.meals.dinner}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Meal Plan
              </button>
            </div>
          </div>
        )}

        {/* Seasonal Ingredients Tab */}
        {activeTab === "seasonal" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                What's in Season Now
              </h2>
              <p className="text-gray-600">
                Cooking with seasonal ingredients ensures better flavor,
                nutrition, and sustainability. Here are some ingredients that
                are currently in season.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {seasonalIngredients.map((ingredient) => (
                <div key={ingredient.name} className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-2">
                    <img
                      src={ingredient.imageUrl}
                      alt={ingredient.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium">{ingredient.name}</h3>
                  <p className="text-sm text-gray-500">{ingredient.season}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">
                  Why Eat Seasonal?
                </h3>
                <ul className="text-green-700 text-sm space-y-2">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Better taste and nutritional value
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    More environmentally friendly
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Usually less expensive
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Encourages diverse eating habits
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">Coming Soon</h3>
                <p className="text-blue-700 text-sm mb-3">
                  These ingredients will be in season in the coming weeks:
                </p>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>Cherries</li>
                  <li>Peaches</li>
                  <li>Corn</li>
                  <li>Bell Peppers</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Cooking Tips Tab */}
        {activeTab === "tips" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Cooking Tips & Tricks
              </h2>
              <p className="text-gray-600">
                Improve your cooking skills with these expert tips and kitchen
                hacks.
              </p>
            </div>

            <div className="space-y-6">
              {cookingTips.map((tip) => (
                <div key={tip.id} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">{tip.title}</h3>
                  <p className="text-gray-700">{tip.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800 mb-2">Tip of the Day</h3>
              <p className="text-yellow-700">
                Let meat rest after cooking to allow juices to redistribute. For
                steaks, rest for about 5 minutes per inch of thickness.
              </p>
            </div>

            <div className="mt-8 text-center">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View All Tips
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspirePage;
