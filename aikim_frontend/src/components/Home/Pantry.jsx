// src/components/Home/Pantry.jsx
import React, { useState, useEffect } from "react";
import { inventoryService } from "../../services/api";
import { useNavigate } from "react-router-dom";

const PantryItem = ({ item, onToggleSelected }) => {
  const { id, name, quantity, unit, selected, status } = item;

  return (
    <div className="py-3 border-b border-gray-200 flex items-center">
      <div
        className={`w-2 h-2 rounded-full ml-2 mr-3 ${
          status === "expired"
            ? "bg-gray-400"
            : status === "expiring"
            ? "bg-orange-400"
            : "bg-green-400"
        }`}
      ></div>

      <div className="flex-grow w-1/2">
        <span className="text-gray-800">{name}</span>
      </div>

      <div className="w-1/3 text-left text-gray-600 mr-4">
        {quantity} {unit}
      </div>

      <div className="w-5 h-5 flex items-center justify-center">
        <input
          type="checkbox"
          disabled={status === "expired"}
          checked={selected}
          onChange={() => onToggleSelected(id, !selected)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
      </div>
    </div>
  );
};

const Pantry = () => {
  const navigate = useNavigate();
  const [pantryItems, setPantryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateDate, setUpdateDate] = useState("");

  useEffect(() => {
    // Helper function to determine item status based on expiration date
    const getItemStatus = (expirationDate) => {
      if (!expirationDate) return "good";

      const expiry = new Date(expirationDate);
      const today = new Date();

      if (expiry < today) {
        return "expired";
      }

      // If within 5 days of expiry
      const daysUntilExpiry = Math.ceil(
        (expiry - today) / (1000 * 60 * 60 * 24)
      );
      if (daysUntilExpiry <= 5) {
        return "expiring";
      }

      return "good";
    };

    // Calculate days until expiry
    const getDaysUntilExpiry = (expirationDate) => {
      const expiry = new Date(expirationDate);
      const today = new Date();
      return Math.max(0, Math.ceil((expiry - today) / (1000 * 60 * 60 * 24)));
    };

    const loadMockData = () => {
      const mockData = [
        {
          id: 1,
          name: "Potatoes",
          quantity: "2",
          unit: "pc",
          selected: false,
          status: "expired",
        },
        {
          id: 2,
          name: "Zucchini",
          quantity: "4",
          unit: "pc",
          selected: true,
          status: "expiring",
          expiringDays: 3,
        },
        {
          id: 3,
          name: "Quinoa",
          quantity: "200",
          unit: "g",
          status: "expiring",
          expiringDays: 2,
        },
        {
          id: 4,
          name: "Salmon fillets",
          quantity: "2 x 150",
          unit: "g",
          selected: false,
          status: "good",
        },
        {
          id: 5,
          name: "Potatoes",
          quantity: "200",
          unit: "g",
          selected: true,
          status: "good",
        },
        {
          id: 6,
          name: "Chicken",
          quantity: "500",
          unit: "g",
          selected: false,
          status: "good",
        },
        {
          id: 7,
          name: "Eggs",
          quantity: "12",
          unit: "pc",
          selected: false,
          status: "good",
        },
      ];
      setPantryItems(mockData);
      setUpdateDate("2.1.2025");
    };

    const fetchPantryItems = async () => {
      try {
        setLoading(true);
        const items = await inventoryService.getAllItems();
        // Transform the API response to match our component's expected format
        const transformedItems = items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          selected: false,
          status: getItemStatus(item.expiration_date),
          expiringDays: item.expiration_date
            ? getDaysUntilExpiry(item.expiration_date)
            : null,
        }));
        setPantryItems(transformedItems);
        setUpdateDate(new Date().toLocaleDateString());
      } catch (error) {
        console.error("Failed to fetch pantry items:", error);
        // If fetch fails, use mock data as fallback
        loadMockData();
      } finally {
        setLoading(false);
      }
    };

    fetchPantryItems();
  }, []);

  const handleToggleSelected = async (itemId, selected) => {
    try {
      // Update local state immediately for responsive UI
      setPantryItems(
        pantryItems.map((item) =>
          item.id === itemId ? { ...item, selected } : item
        )
      );

      // We don't actually update the API for selection state since it's a UI-only feature
      // If we needed to persist this state, we would need to add this to the backend API
      // For now, this selection is only used for generating recipes or marking items as used
    } catch (error) {
      console.error("Failed to update pantry item:", error);
      // Revert local state if there's an error
      setPantryItems(
        pantryItems.map((item) =>
          item.id === itemId ? { ...item, selected: !selected } : item
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-6 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const groupedItems = {
    expired: pantryItems.filter((item) => item.status === "expired"),
    expiring: pantryItems.filter((item) => item.status === "expiring"),
    good: pantryItems.filter((item) => item.status === "good"),
  };

  return (
    <div className="pantry-section p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Pantry</h2>
          <p className="text-sm text-gray-500">Updated since {updateDate}</p>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => navigate("/scan-receipt")}
            className="flex items-center text-blue-600 mr-2"
          >
            Add New
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="pantry-items flex-grow overflow-y-auto flex-1">
        {groupedItems.expired.length > 0 && (
          <div className="mb-4">
            <div className="bg-gray-200 px-3 py-1 rounded-md inline-block text-xs font-medium text-gray-700 mb-2">
              Expired
            </div>
            {groupedItems.expired.map((item) => (
              <PantryItem
                key={item.id}
                item={item}
                onToggleSelected={handleToggleSelected}
              />
            ))}
          </div>
        )}

        {groupedItems.expiring.length > 0 && (
          <div className="mb-4">
            <div className="bg-orange-200 px-3 py-1 rounded-md inline-block text-xs font-medium text-orange-700 mb-2">
              Expiring in{" "}
              {groupedItems.expiring.reduce((min, item) => {
                const days = item.expiringDays || 0;
                return Math.min(min, days);
              }, Infinity)}
              {"+ "}
              Days
            </div>
            {groupedItems.expiring.map((item) => (
              <PantryItem
                key={item.id}
                item={item}
                onToggleSelected={handleToggleSelected}
              />
            ))}
          </div>
        )}

        {groupedItems.good.length > 0 && (
          <div>
            {groupedItems.good.map((item) => (
              <PantryItem
                key={item.id}
                item={item}
                onToggleSelected={handleToggleSelected}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex space-x-2">
        <button className="flex-1 bg-blue-100 text-blue-600 py-3 px-4 rounded-full hover:bg-blue-200 transition duration-200 font-medium">
          Generate Recipe
        </button>
        <button className="w-1/3 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-full hover:bg-gray-50 transition duration-200 font-medium">
          Have used
        </button>
      </div>
    </div>
  );
};

export default Pantry;
