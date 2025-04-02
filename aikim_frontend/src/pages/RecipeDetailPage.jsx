// src/pages/RecipeDetailPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { inventoryService } from "../services/api";

const RecipeDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state || { recipe: null };
  const [currentStep, setCurrentStep] = useState(1);
  const [usedIngredients, setUsedIngredients] = useState(
    recipe?.ingredients.map((ing) => ({ ...ing, used: false })) || []
  );
  const [isUpdatingInventory, setIsUpdatingInventory] = useState(false);

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Parse instruction steps
  const instructionSteps = recipe.instructions
    .split(/\d+\./)
    .filter((step) => step.trim().length > 0)
    .map((step) => step.trim());

  const totalSteps = instructionSteps.length;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleIngredientToggle = (index, used) => {
    const updatedIngredients = [...usedIngredients];
    updatedIngredients[index].used = used;
    setUsedIngredients(updatedIngredients);
  };

  const handleFinishCooking = async () => {
    try {
      setIsUpdatingInventory(true);

      // Filter out ingredients that were used
      const ingredientsToUpdate = usedIngredients.filter((ing) => ing.used);

      if (ingredientsToUpdate.length === 0) {
        // No ingredients marked as used
        navigate("/");
        return;
      }

      // Process each used ingredient to update inventory
      for (const ingredient of ingredientsToUpdate) {
        try {
          // First get the current inventory item to check quantity
          const inventoryItems = await inventoryService.getAllItems();
          const inventoryItem = inventoryItems.find(
            (item) => item.name.toLowerCase() === ingredient.name.toLowerCase()
          );

          if (inventoryItem) {
            // Calculate new quantity
            const newQuantity =
              parseFloat(inventoryItem.quantity) -
              parseFloat(ingredient.quantity);

            if (newQuantity <= 0) {
              // Delete the item if quantity is zero or negative
              await inventoryService.deleteItem(inventoryItem.id);
            } else {
              // Update with new quantity
              await inventoryService.updateItem(inventoryItem.id, {
                ...inventoryItem,
                quantity: newQuantity,
              });
            }
          }
        } catch (itemError) {
          console.error(
            `Error updating inventory item ${ingredient.name}:`,
            itemError
          );
          // Continue with other items even if one fails
        }
      }

      // Show success message
      alert("Your pantry has been updated with the used ingredients!");

      // Navigate back to home
      navigate("/");
    } catch (error) {
      console.error("Error updating inventory:", error);
      alert("There was an error updating your pantry. Please try again.");
    } finally {
      setIsUpdatingInventory(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{recipe.recipe}</h1>
        <div>
          <button onClick={() => navigate(-1)} className="text-blue-600 mr-4">
            Back
          </button>
          <button onClick={() => navigate("/")} className="text-gray-600">
            Home
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <h2 className="font-semibold mb-2">Cooking Info</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="border-b border-gray-100 py-2">
                <span className="text-gray-600">Prep Time</span>
                <p className="font-medium">5 MIN</p>
              </div>
              <div className="border-b border-gray-100 py-2">
                <span className="text-gray-600">Cook Time</span>
                <p className="font-medium">{recipe.cooking_time} MIN</p>
              </div>
              <div className="border-b border-gray-100 py-2">
                <span className="text-gray-600">Servings</span>
                <p className="font-medium">1 PEOPLE</p>
              </div>
              <div className="border-b border-gray-100 py-2">
                <span className="text-gray-600">Spice Level</span>
                <p className="font-medium">{recipe.spicy_level}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="font-semibold mb-2">Mark Used Ingredients</h2>
            <p className="text-sm text-gray-500 mb-2">
              Check ingredients that you've used so we can update your pantry.
            </p>
            <ul className="space-y-2">
              {usedIngredients.map((ingredient, idx) => (
                <li key={idx} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4"
                    checked={ingredient.used}
                    onChange={(e) =>
                      handleIngredientToggle(idx, e.target.checked)
                    }
                  />
                  <span>
                    {ingredient.name}: {ingredient.quantity} {ingredient.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
            <div className="absolute top-4 right-4 flex items-center text-sm">
              <span className="text-blue-600 font-medium">
                Step {currentStep}/{totalSteps}
              </span>
            </div>

            <h2 className="text-xl font-bold mb-6">Recipe</h2>

            <div className="mb-6">
              <div className="rounded-lg bg-blue-50 p-4 mb-4">
                <h3 className="font-semibold text-lg mb-2">
                  {currentStep === 1
                    ? "Prepare Ingredients"
                    : `Step ${currentStep}`}
                </h3>
                <p>{instructionSteps[currentStep - 1]}</p>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className={`px-4 py-2 rounded ${
                    currentStep === 1
                      ? "bg-gray-200 text-gray-500"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  Previous
                </button>

                {currentStep < totalSteps ? (
                  <button
                    onClick={handleNextStep}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleFinishCooking}
                    disabled={isUpdatingInventory}
                    className={`px-4 py-2 rounded ${
                      isUpdatingInventory ? "bg-gray-400" : "bg-green-600"
                    } text-white`}
                  >
                    {isUpdatingInventory
                      ? "Updating..."
                      : "Finish & Update Pantry"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-100 text-blue-600 rounded-full font-medium"
        >
          Save for Later
        </button>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
