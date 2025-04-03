// src/pages/PantryPage.jsx
import React, { useState } from "react";

const PantryPage = () => {
  // Dummy pantry data with categories
  const [pantryItems, setPantryItems] = useState({
    fruits: [
      {
        id: 1,
        name: "Apples",
        quantity: 5,
        unit: "pc",
        expiry: "2025-04-15",
        category: "fruits",
      },
      {
        id: 2,
        name: "Bananas",
        quantity: 6,
        unit: "pc",
        expiry: "2025-04-10",
        category: "fruits",
      },
      {
        id: 3,
        name: "Strawberries",
        quantity: 250,
        unit: "g",
        expiry: "2025-04-08",
        category: "fruits",
      },
    ],
    vegetables: [
      {
        id: 4,
        name: "Carrots",
        quantity: 500,
        unit: "g",
        expiry: "2025-04-20",
        category: "vegetables",
      },
      {
        id: 5,
        name: "Broccoli",
        quantity: 1,
        unit: "pc",
        expiry: "2025-04-12",
        category: "vegetables",
      },
      {
        id: 6,
        name: "Spinach",
        quantity: 200,
        unit: "g",
        expiry: "2025-04-09",
        category: "vegetables",
      },
      {
        id: 7,
        name: "Bell Peppers",
        quantity: 3,
        unit: "pc",
        expiry: "2025-04-14",
        category: "vegetables",
      },
    ],
    dairy: [
      {
        id: 8,
        name: "Milk",
        quantity: 1,
        unit: "liter",
        expiry: "2025-04-18",
        category: "dairy",
      },
      {
        id: 9,
        name: "Cheese",
        quantity: 250,
        unit: "g",
        expiry: "2025-04-25",
        category: "dairy",
      },
      {
        id: 10,
        name: "Yogurt",
        quantity: 500,
        unit: "ml",
        expiry: "2025-04-16",
        category: "dairy",
      },
    ],
    meats: [
      {
        id: 11,
        name: "Chicken Breast",
        quantity: 500,
        unit: "g",
        expiry: "2025-04-11",
        category: "meats",
      },
      {
        id: 12,
        name: "Ground Beef",
        quantity: 300,
        unit: "g",
        expiry: "2025-04-08",
        category: "meats",
      },
    ],
    grains: [
      {
        id: 13,
        name: "Rice",
        quantity: 1,
        unit: "kg",
        expiry: "2025-07-20",
        category: "grains",
      },
      {
        id: 14,
        name: "Pasta",
        quantity: 500,
        unit: "g",
        expiry: "2025-08-15",
        category: "grains",
      },
      {
        id: 15,
        name: "Quinoa",
        quantity: 250,
        unit: "g",
        expiry: "2025-06-30",
        category: "grains",
      },
    ],
  });

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status based on days until expiry
  const getExpiryStatus = (expiryDate) => {
    const daysLeft = getDaysUntilExpiry(expiryDate);
    if (daysLeft < 0) return "expired";
    if (daysLeft < 3) return "expiring-soon";
    if (daysLeft < 7) return "expiring";
    return "good";
  };

  // Filter items based on search and category
  const getFilteredItems = () => {
    let filteredItems = [];

    // Collect all items or filter by category
    if (selectedCategory === "all") {
      Object.values(pantryItems).forEach((categoryItems) => {
        filteredItems = [...filteredItems, ...categoryItems];
      });
    } else if (pantryItems[selectedCategory]) {
      filteredItems = pantryItems[selectedCategory];
    }

    // Filter by search term
    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredItems;
  };

  // Group items by expiry status
  const groupByExpiryStatus = (items) => {
    const grouped = {
      expired: [],
      "expiring-soon": [],
      expiring: [],
      good: [],
    };

    items.forEach((item) => {
      const status = getExpiryStatus(item.expiry);
      grouped[status].push(item);
    });

    return grouped;
  };

  const categories = [
    { id: "all", name: "All Items" },
    { id: "fruits", name: "Fruits" },
    { id: "vegetables", name: "Vegetables" },
    { id: "dairy", name: "Dairy" },
    { id: "meats", name: "Meats" },
    { id: "grains", name: "Grains" },
  ];

  const filteredItems = getFilteredItems();
  const groupedItems = groupByExpiryStatus(filteredItems);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">My Pantry</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-2">Filter by Category</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedCategory === category.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-64">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search Items
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your pantry..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Pantry Items</h2>
            <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Item
            </button>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200">
            {/* Expired items */}
            {groupedItems.expired.length > 0 && (
              <div className="bg-red-50">
                <div className="px-4 py-2 bg-red-100 text-red-800 font-medium">
                  Expired
                </div>
                {groupedItems.expired.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 border-t border-red-100 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({item.quantity} {item.unit})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-red-600 text-sm mr-4">Expired</span>
                      <button className="text-gray-400 hover:text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Expiring soon items */}
            {groupedItems["expiring-soon"].length > 0 && (
              <div className="bg-orange-50">
                <div className="px-4 py-2 bg-orange-100 text-orange-800 font-medium">
                  Expiring Within 3 Days
                </div>
                {groupedItems["expiring-soon"].map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 border-t border-orange-100 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({item.quantity} {item.unit})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-orange-600 text-sm mr-4">
                        {getDaysUntilExpiry(item.expiry)} days left
                      </span>
                      <button className="text-gray-400 hover:text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Expiring items */}
            {groupedItems.expiring.length > 0 && (
              <div className="bg-yellow-50">
                <div className="px-4 py-2 bg-yellow-100 text-yellow-800 font-medium">
                  Expiring Within 7 Days
                </div>
                {groupedItems.expiring.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 border-t border-yellow-100 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({item.quantity} {item.unit})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-600 text-sm mr-4">
                        {getDaysUntilExpiry(item.expiry)} days left
                      </span>
                      <button className="text-gray-400 hover:text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Good items */}
            {groupedItems.good.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-gray-100 text-gray-800 font-medium">
                  Fresh Items
                </div>
                {groupedItems.good.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 border-t border-gray-100 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({item.quantity} {item.unit})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 text-sm mr-4">
                        Expires in {getDaysUntilExpiry(item.expiry)} days
                      </span>
                      <button className="text-gray-400 hover:text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredItems.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto mb-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <p className="mb-1">No items found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantryPage;
