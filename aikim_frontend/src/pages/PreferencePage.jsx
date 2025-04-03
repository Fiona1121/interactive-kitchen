// src/pages/PreferencePage.jsx
import React, { useState } from "react";

const PreferencePage = () => {
  // Dummy dietary preferences
  const [dietaryPreferences, setDietaryPreferences] = useState({
    vegetarian: false,
    vegan: false,
    pescatarian: false,
    glutenFree: true,
    dairyFree: false,
    nutFree: false,
    lowCarb: false,
    keto: false,
    paleo: false,
  });

  // Dummy allergy preferences
  const [allergies, setAllergies] = useState({
    peanuts: true,
    treeNuts: false,
    dairy: false,
    eggs: false,
    wheat: true,
    soy: false,
    fish: false,
    shellfish: false,
    sesame: false,
  });

  // Dummy meal preferences
  const [mealPreferences, setMealPreferences] = useState({
    breakfast: true,
    lunch: true,
    dinner: true,
    snacks: false,
    mealPrepSunday: true,
    quickMeals: true,
    familyFriendly: false,
  });

  // Dummy cuisine preferences
  const [cuisinePreferences, setCuisinePreferences] = useState([
    { id: "italian", name: "Italian", selected: true },
    { id: "mexican", name: "Mexican", selected: true },
    { id: "american", name: "American", selected: false },
    { id: "chinese", name: "Chinese", selected: true },
    { id: "japanese", name: "Japanese", selected: false },
    { id: "indian", name: "Indian", selected: true },
    { id: "thai", name: "Thai", selected: false },
    { id: "greek", name: "Greek", selected: false },
    { id: "french", name: "French", selected: false },
    { id: "spanish", name: "Spanish", selected: false },
    { id: "middle_eastern", name: "Middle Eastern", selected: false },
    { id: "korean", name: "Korean", selected: true },
  ]);

  // Dummy spice level preference
  const [spiceLevel, setSpiceLevel] = useState(3); // Scale of 1-5

  // Dummy cooking time preference
  const [cookingTime, setCookingTime] = useState(30); // Minutes

  // Handle checkbox toggle for dietary/allergy/meal preferences
  const handleCheckboxToggle = (preferenceName, key) => {
    if (preferenceName === "dietary") {
      setDietaryPreferences({
        ...dietaryPreferences,
        [key]: !dietaryPreferences[key],
      });
    } else if (preferenceName === "allergies") {
      setAllergies({
        ...allergies,
        [key]: !allergies[key],
      });
    } else if (preferenceName === "meals") {
      setMealPreferences({
        ...mealPreferences,
        [key]: !mealPreferences[key],
      });
    }
  };

  // Handle toggle for cuisine preferences
  const handleCuisineToggle = (id) => {
    setCuisinePreferences(
      cuisinePreferences.map((cuisine) =>
        cuisine.id === id
          ? { ...cuisine, selected: !cuisine.selected }
          : cuisine
      )
    );
  };

  // Handle save preferences
  const handleSavePreferences = () => {
    alert("Preferences saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">My Preferences</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Dietary Preferences</h2>
          <span className="text-sm text-blue-600">
            Help us suggest recipes that match your diet
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {Object.keys(dietaryPreferences).map((key) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                id={`dietary-${key}`}
                checked={dietaryPreferences[key]}
                onChange={() => handleCheckboxToggle("dietary", key)}
                className="h-5 w-5 text-blue-600 rounded mr-2"
              />
              <label htmlFor={`dietary-${key}`} className="capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Allergies & Restrictions
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {Object.keys(allergies).map((key) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={`allergy-${key}`}
                  checked={allergies[key]}
                  onChange={() => handleCheckboxToggle("allergies", key)}
                  className="h-5 w-5 text-red-600 rounded mr-2"
                />
                <label htmlFor={`allergy-${key}`} className="capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Cuisine Preferences</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {cuisinePreferences.map((cuisine) => (
              <div key={cuisine.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`cuisine-${cuisine.id}`}
                  checked={cuisine.selected}
                  onChange={() => handleCuisineToggle(cuisine.id)}
                  className="h-5 w-5 text-blue-600 rounded mr-2"
                />
                <label htmlFor={`cuisine-${cuisine.id}`}>{cuisine.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Meal Types</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {Object.keys(mealPreferences).map((key) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  id={`meal-${key}`}
                  checked={mealPreferences[key]}
                  onChange={() => handleCheckboxToggle("meals", key)}
                  className="h-5 w-5 text-blue-600 rounded mr-2"
                />
                <label htmlFor={`meal-${key}`} className="capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Spice Level</h2>
          <div className="mb-8">
            <input
              type="range"
              min="1"
              max="5"
              value={spiceLevel}
              onChange={(e) => setSpiceLevel(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Mild</span>
              <span>Medium</span>
              <span>Spicy!</span>
            </div>
            <div className="mt-4 text-center">
              <span className="font-medium">
                Current preference:{" "}
                {
                  ["Very Mild", "Mild", "Medium", "Spicy", "Very Spicy"][
                    spiceLevel - 1
                  ]
                }
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Cooking Time</h2>
          <div className="mb-8">
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Maximum cooking time:</span>
              <select
                value={cookingTime}
                onChange={(e) => setCookingTime(parseInt(e.target.value))}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2+ hours</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSavePreferences}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencePage;
