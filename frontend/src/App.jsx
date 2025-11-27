import React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import authStore from './stores/authStore';
import HomePage from './components/Home/HomePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

const App = observer(() => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={!authStore.isAuthenticated ? <HomePage /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/login" 
            element={!authStore.isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!authStore.isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} 
          />
          
          <Route 
            path="/dashboard" 
            element={authStore.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
});

export default App;