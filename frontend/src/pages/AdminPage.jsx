import React from 'react';
import api from '../services/api';

const AdminPage = ({ admin }) => {
  return (
    <div>
      <h1>Welcome, Admin {admin.username}!</h1>
      <p>Email: {admin.email}</p>
      {/* Add more admin-specific content here */}
    </div>
  );
};

export default AdminPage;
