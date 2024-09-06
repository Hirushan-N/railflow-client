// src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

const getUsers = async () => {
  const response = await axios.get(API_URL,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
  return response.data;
};

const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
  return response.data;
};

const updateUser = async (userId, userData) => {
  const response = await axios.put(`${API_URL}/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
  return response.data;
};

export default { getUsers, createUser, updateUser, deleteUser };
