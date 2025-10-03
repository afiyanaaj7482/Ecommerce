import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Lists from './pages/Lists';
import { adminDataContext } from './context/AdminContext';

function App() {
  const { adminData } = useContext(adminDataContext);

  // If no adminData, show login page
  if (!adminData) {
    return <Login />;
  }

  // If adminData is present, render app routes
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/lists" element={<Lists />} />
      <Route path="/login" element={<Login />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

export default App;
