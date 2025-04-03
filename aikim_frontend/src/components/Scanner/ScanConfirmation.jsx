// src/components/Scanner/ScanConfirmation.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { inventoryService } from "../../services/api";

const ScanConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items = [], receipt = "" } = location.state || {};

  const [selectedItems, setSelectedItems] = useState(
    items.map((item) => ({ ...item, selected: true }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTotal, setCurrentTotal] = useState(0);

  // Calculate total spent based on some dummy prices
  useState(() => {
    // Simulate a total based on scanned items
    const randomTotal = 24.2;
    setCurrentTotal(randomTotal.toFixed(2));
  }, []);

  const handleItemToggle = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].selected = !updatedItems[index].selected;
    setSelectedItems(updatedItems);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].quantity = newQuantity;
    setSelectedItems(updatedItems);
  };

  const handleAddToPantry = async () => {
    setIsSubmitting(true);

    try {
      // Filter only selected items
      const itemsToAdd = selectedItems
        .filter((item) => item.selected)
        .map((item) => ({
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          expiration_date:
            item.expiration_date || getDefaultExpirationDate(item.name),
        }));

      if (itemsToAdd.length > 0) {
        // Call the API to add items to inventory
        await inventoryService.createItems(itemsToAdd);
      }

      // Navigate back to the pantry page
      navigate("/");

      // Show success notification
      alert(`Added ${itemsToAdd.length} items to your pantry!`);
    } catch (error) {
      console.error("Error adding items to pantry:", error);
      alert("Failed to add items to your pantry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to generate default expiration date based on food type
  const getDefaultExpirationDate = (itemName) => {
    const today = new Date();
    let daysToAdd = 7; // Default 1 week

    // Simple logic to set different expiration dates based on item type
    const itemLower = itemName.toLowerCase();
    if (itemLower.includes("milk") || itemLower.includes("cream")) {
      daysToAdd = 7;
    } else if (itemLower.includes("bread") || itemLower.includes("bakery")) {
      daysToAdd = 5;
    } else if (
      itemLower.includes("meat") ||
      itemLower.includes("fish") ||
      itemLower.includes("seafood")
    ) {
      daysToAdd = 3;
    } else if (itemLower.includes("vegetable") || itemLower.includes("fruit")) {
      daysToAdd = 7;
    } else if (itemLower.includes("egg")) {
      daysToAdd = 21;
    } else if (itemLower.includes("cheese")) {
      daysToAdd = 14;
    }

    today.setDate(today.getDate() + daysToAdd);
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const handleRescan = () => {
    navigate("/scan-receipt");
  };

  return (
    <div className="scan-confirmation bg-white h-full flex flex-col">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Scan Results</h2>
            <p className="text-sm text-gray-600">
              Date: {new Date().toLocaleDateString()} | Total Spend: $
              {currentTotal}
            </p>
          </div>
          <button onClick={() => navigate(-1)} className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-auto p-4 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Receipt thumbnail */}
          {receipt && (
            <div className="border rounded-lg overflow-hidden md:col-span-2">
              <img
                src={receipt}
                alt="Receipt"
                className="w-full h-40 object-contain bg-gray-100"
              />
            </div>
          )}

          {/* Scanned items */}
          <div className="md:col-span-2">
            <h3 className="font-bold text-lg mb-2">Scanned Items</h3>
            <div className="grid grid-cols-4 gap-4">
              {selectedItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center gap-12 p-2 py-6 h-40 rounded-lg border border-gray-200`}
                >
                  <div className="font-bold capitalize">
                    {item.name.toLowerCase()}
                  </div>
                  <div className="flex items-center mt-1">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          index,
                          item.unit === "kg"
                            ? Math.max(0.1, item.quantity - 0.1)
                            : Math.max(1.0, item.quantity - 1)
                        )
                      }
                      className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </button>

                    <span className="mx-2 min-w-[60px] text-center">
                      {item.quantity.toFixed(1) === "0.0"
                        ? "0.1"
                        : item.quantity.toFixed(1)}{" "}
                      {item.unit}
                    </span>

                    <button
                      onClick={() =>
                        handleQuantityChange(
                          index,
                          item.unit === "kg"
                            ? item.quantity + 0.1
                            : item.quantity + 1.0
                        )
                      }
                      className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 flex space-x-4">
        <button
          onClick={handleRescan}
          className="flex-1 py-3 px-4 rounded-full border border-gray-300 text-gray-700 font-medium"
        >
          Re-scan
        </button>

        <button
          onClick={handleAddToPantry}
          disabled={
            isSubmitting ||
            selectedItems.filter((item) => item.selected).length === 0
          }
          className={`flex-1 py-3 px-4 rounded-full font-medium ${
            isSubmitting ||
            selectedItems.filter((item) => item.selected).length === 0
              ? "bg-gray-200 text-gray-500"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add to Pantry"}
        </button>
      </div>
    </div>
  );
};

export default ScanConfirmation;
