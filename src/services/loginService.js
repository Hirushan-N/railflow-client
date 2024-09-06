// src/services/loginService.js
import axios from 'axios';

const API_URL = "http://localhost:3000/api";  // Replace with your actual API URL

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { username, password });
    const token = response.data.token;
    localStorage.setItem('authToken', token);  // Store token for further requests
    return response.data;  // Return the entire response, including user data (e.g., role)
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

export default { login };
