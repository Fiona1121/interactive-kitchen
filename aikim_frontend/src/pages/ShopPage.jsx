// src/pages/ShopPage.jsx
import React, { useState } from "react";

const ShopPage = () => {
  // Dummy recommended items
  const [recommendedItems, setRecommendedItems] = useState([
    {
      id: 1,
      name: "Eggs",
      quantity: "1 dozen",
      reason: "Used frequently in your recipes",
      category: "Dairy & Eggs",
      price: 3.99,
    },
    {
      id: 2,
      name: "Milk",
      quantity: "1 gallon",
      reason: "Running low (25% left)",
      category: "Dairy & Eggs",
      price: 4.29,
    },
    {
      id: 3,
      name: "Chicken Breast",
      quantity: "1 lb",
      reason: "Weekly staple based on your cooking history",
      category: "Meat & Seafood",
      price: 5.99,
    },
    {
      id: 4,
      name: "Onions",
      quantity: "3 pc",
      reason: "Used in multiple upcoming recipes",
      category: "Vegetables",
      price: 1.49,
    },
    {
      id: 5,
      name: "Tomatoes",
      quantity: "4 pc",
      reason: "Used in multiple upcoming recipes",
      category: "Vegetables",
      price: 2.99,
    },
  ]);

  // Dummy shopping list
  const [shoppingList, setShoppingList] = useState([
    {
      id: 101,
      name: "Pasta",
      quantity: "2 boxes",
      category: "Grains",
      price: 2.49,
      checked: false,
    },
    {
      id: 102,
      name: "Olive Oil",
      quantity: "1 bottle",
      category: "Oils & Vinegars",
      price: 8.99,
      checked: true,
    },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    category: "Other",
  });

  // Add item from recommendations to shopping list
  const addToShoppingList = (item) => {
    // Check if item is already in shopping list
    const existingItem = shoppingList.find(
      (listItem) => listItem.name === item.name
    );

    if (existingItem) {
      alert(`${item.name} is already in your shopping list.`);
      return;
    }

    const newShoppingItem = {
      id: Date.now(), // Simple unique ID
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      price: item.price,
      checked: false,
    };

    setShoppingList([...shoppingList, newShoppingItem]);

    // Remove from recommendations
    setRecommendedItems(recommendedItems.filter((rec) => rec.id !== item.id));
  };

  // Add manual item to shopping list
  const addManualItem = (e) => {
    e.preventDefault();

    if (!newItem.name || !newItem.quantity) {
      alert("Please enter both name and quantity.");
      return;
    }

    const manualItem = {
      id: Date.now(),
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category,
      price: 0, // Price unknown for manual items
      checked: false,
    };

    setShoppingList([...shoppingList, manualItem]);
    setNewItem({ name: "", quantity: "", category: "Other" });
  };

  // Toggle item checked status
  const toggleItemChecked = (id) => {
    setShoppingList(
      shoppingList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Remove item from shopping list
  const removeItem = (id) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };

  // Calculate total price
  const calculateTotal = () => {
    return shoppingList
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2);
  };

  // Sort shopping list by category
  const sortedShoppingList = [...shoppingList].sort((a, b) => {
    // First by checked status
    if (a.checked !== b.checked) {
      return a.checked ? 1 : -1;
    }
    // Then by category
    return a.category.localeCompare(b.category);
  });

  // Group shopping list by category
  const groupedShoppingList = sortedShoppingList.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Shopping List</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left column - Shopping List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Shopping List</h2>
            <span className="text-gray-600">Total: ${calculateTotal()}</span>
          </div>

          {/* Add item form */}
          <form onSubmit={addManualItem} className="mb-6">
            <div className="flex flex-col md:flex-row gap-2 mb-4">
              <input
                type="text"
                placeholder="Item name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                className="flex-grow p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({ ...newItem, quantity: e.target.value })
                }
                className="md:w-1/4 p-2 border border-gray-300 rounded"
              />
              <select
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
                className="md:w-1/4 p-2 border border-gray-300 rounded bg-white"
              >
                <option value="Dairy & Eggs">Dairy & Eggs</option>
                <option value="Produce">Produce</option>
                <option value="Meat & Seafood">Meat & Seafood</option>
                <option value="Bakery">Bakery</option>
                <option value="Pantry">Pantry</option>
                <option value="Frozen">Frozen</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add Item
            </button>
          </form>

          {/* Shopping list */}
          <div className="space-y-4">
            {Object.keys(groupedShoppingList).length > 0 ? (
              Object.entries(groupedShoppingList).map(([category, items]) => (
                <div key={category}>
                  <h3 className="font-medium text-gray-700 mb-2">{category}</h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className={`flex items-center p-3 border rounded ${
                          item.checked
                            ? "bg-gray-50 border-gray-200"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleItemChecked(item.id)}
                          className="h-5 w-5 mr-3 text-blue-600 rounded"
                        />
                        <span
                          className={`flex-grow ${
                            item.checked ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {item.name}{" "}
                          <span className="text-sm text-gray-500">
                            ({item.quantity})
                          </span>
                        </span>
                        <span className="text-gray-700 mx-4">
                          {item.price > 0 ? `${item.price.toFixed(2)}` : ""}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
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
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p>Your shopping list is empty</p>
                <p className="text-sm">
                  Add items from recommendations or manually
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right column - Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recommended Items</h2>

          {recommendedItems.length > 0 ? (
            <ul className="space-y-3">
              {recommendedItems.map((item) => (
                <li
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.quantity}</p>
                    </div>
                    <span className="text-gray-700">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.reason}</p>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => addToShoppingList(item)}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm font-medium"
                    >
                      Add to List
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-lg">
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <p>No recommendations available</p>
              <p className="text-sm">
                We'll suggest items based on your cooking habits
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3">Shopping Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Check your pantry before shopping to avoid buying duplicates
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Buy ingredients that can be used in multiple recipes
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Consider seasonal produce for better quality and price
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
