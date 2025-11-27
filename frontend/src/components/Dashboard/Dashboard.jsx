import React from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '../../stores/authStore';
import './Dashboard.css';

const Dashboard = observer(() => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {authStore.user?.username}</h1>
        <p>Ready to explore amazing startup projects?</p>
      </div>

      <div className="dashboard-actions">
        <button className="dashboard-button">
          Browse Projects
        </button>
        <button className="dashboard-button">
          My Favorites
        </button>
        <button className="dashboard-button">
          Add Project
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Projects</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Likes</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Reviews</h3>
          <p>0</p>
        </div>
      </div>

      <button 
        onClick={() => authStore.logout()}
        className="logout-button"
      >
        Logout
      </button>
    </div>
  );
});

export default Dashboard;