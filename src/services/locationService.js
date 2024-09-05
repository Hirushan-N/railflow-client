// src/services/locationService.js
import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'https://cobsccompy4231p-012-api-8e2e4fbeaabd.herokuapp.com/api/locations';

// Function to get all locations
const getAllLocations = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to get a location by ID
const getLocationById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const searchLocations = async (searchBar, startStation, endStation, dateTime) => {
    try {
        // Construct the URL with all parameters
        const url = `${API_BASE_URL}/search?searchBar=${encodeURIComponent(searchBar)}&startStation=${encodeURIComponent(startStation)}&endStation=${encodeURIComponent(endStation)}&dateTime=${encodeURIComponent(dateTime)}`;

        const response = await axios.get(url);
        console.log("Response :", response);
        return response.data;
    } catch (error) {
        throw error;
    }
};



// Function to create a new location
const createLocation = async (locationData) => {
    try {
        const response = await axios.post(API_BASE_URL, locationData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to update a location by ID
const updateLocation = async (id, locationData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, locationData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to delete a location by ID
const deleteLocation = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Export all functions
export default {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
    searchLocations,
};
