import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home'; // Ensure this path is correct
import Users from './Pages/Users';
import Trains from './Pages/Trains';
import Login from './Pages/Login';


import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<Users />} />
      <Route path="/trains" element={<Trains />} />
    </Routes>
  );
}

export default App;
