// src/services/trainService.js
import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'https://cobsccompy4231p-012-api-8e2e4fbeaabd.herokuapp.com/api/trains';

// Function to get all trains
const getAllTrains = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to get a train by ID
const getTrainById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to create a new train
const createTrain = async (trainData) => {
    try {
        const response = await axios.post(API_BASE_URL, trainData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to update a train by ID
const updateTrain = async (id, trainData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, trainData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to delete a train by ID
const deleteTrain = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Export all functions
export default {
    getAllTrains,
    getTrainById,
    createTrain,
    updateTrain,
    deleteTrain,
};
