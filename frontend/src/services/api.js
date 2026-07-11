/**
 * Centralized API Service
 * Keeps component files clean by handling all standard HTTP requests here.
 */

const API_BASE = '/api'; // This hits the proxy we set up in vite.config.js

export const crmApi = {
  // Example: Fetch a specific HCP's details from the database
  getHcpProfile: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/hcps/${id}`);
      if (!response.ok) throw new Error('Failed to fetch HCP profile');
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // Example: Fetch recent interaction logs
  getRecentInteractions: async (hcpId) => {
    try {
      const response = await fetch(`${API_BASE}/interactions/${hcpId}`);
      if (!response.ok) throw new Error('Failed to fetch interactions');
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
};