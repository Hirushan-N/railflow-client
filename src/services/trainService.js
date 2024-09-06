// src/services/trainService.js
import axios from 'axios';

const API_URL = "http://localhost:3000/api/trains";  // Replace with your actual API URL

// Get all trains
const getAllTrains = async () => {
  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
  });
  return response.data;
};

// Create a new train
const createTrain = async (trainData) => {
  const response = await axios.post(`${API_URL}`, trainData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
  });
  return response.data;
};

// Update an existing train
const updateTrain = async (trainId, trainData) => {
  console.log(trainId);
  console.log(trainData);

  const response = await axios.put(`${API_URL}/${trainId}`, trainData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
  });
  console.log('response - ',response);
  return response.data;
};

// Delete a train
const deleteTrain = async (trainId) => {
  const response = await axios.delete(`${API_URL}/${trainId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
  });
  return response.data;
};

export default { getAllTrains, createTrain, updateTrain, deleteTrain };