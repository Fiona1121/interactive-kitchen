// src/services/api.js
import axios from "axios";

// Base API configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth interceptor to add the token to every request
api.interceptors.request.use((config) => {
  const token = process.env.REACT_APP_AUTH_TOKEN;
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Authentication related API calls
export const authService = {
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register/", userData);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login/", credentials);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/auth/logout/");
      localStorage.removeItem("token");
      return response.data;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

// Inventory/Pantry related API calls
export const inventoryService = {
  getAllItems: async () => {
    try {
      const response = await api.get("/inventory/");
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory items:", error);
      throw error;
    }
  },

  createItems: async (items) => {
    try {
      const response = await api.post("/inventory/", items);
      return response.data;
    } catch (error) {
      console.error("Error creating inventory items:", error);
      throw error;
    }
  },

  updateItem: async (itemId, updates) => {
    try {
      const response = await api.put(`/inventory/${itemId}/`, updates);
      return response.data;
    } catch (error) {
      console.error("Error updating inventory item:", error);
      throw error;
    }
  },

  deleteItem: async (itemId) => {
    try {
      const response = await api.delete(`/inventory/${itemId}/`);
      return response.data;
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      throw error;
    }
  },
};

// Recipe related API calls
export const recipeService = {
  suggestRecipes: async (params = {}) => {
    try {
      const response = await api.post("/recipe/suggest/", params);
      return response.data;
    } catch (error) {
      console.error("Error fetching recipe suggestions:", error);
      throw error;
    }
  },

  // Additional frontend-specific methods for recipe management
  getRecommendedRecipes: async () => {
    try {
      // You can implement this using the suggest endpoint with predefined parameters
      const response = await api.post("/recipe/suggest/", {
        cooking_time: "30 minutes",
      });
      return response.data.recipes || [];
    } catch (error) {
      console.error("Error fetching recommended recipes:", error);
      throw error;
    }
  },

  getFavoriteRecipes: async () => {
    try {
      // This functionality may need to be implemented on the backend
      // For now, we'll use the suggest endpoint with a different parameter
      const response = await api.post("/recipe/suggest/", {
        // You might want to add a parameter for favorites once the API supports it
      });
      return response.data.recipes || [];
    } catch (error) {
      console.error("Error fetching favorite recipes:", error);
      throw error;
    }
  },
};

// Receipt scanning service
export const receiptService = {
  scanReceipt: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await api.post("/receipts/scan_receipt/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error scanning receipt:", error);
      throw error;
    }
  },
};

// User management API calls
export const userService = {
  getAllUsers: async () => {
    try {
      const response = await api.get("/users/");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Methods for user statistics (may need to be added to the backend)
  getUserStats: async () => {
    try {
      // This is a frontend-specific method that might need to be implemented on the backend
      // For now, we'll return mock data
      return {
        daysCooked: 4,
        foodUtilizationPercentage: 88,
        since: "Jan 2025",
      };
    } catch (error) {
      console.error("Error fetching user stats:", error);
      throw error;
    }
  },
};

// Export all services
export default {
  authService,
  inventoryService,
  recipeService,
  recipeService,
  userService,
};
