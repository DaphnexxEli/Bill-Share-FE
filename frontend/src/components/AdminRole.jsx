import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';

const AdminRole = () => {
  // Check if the user is authenticated and is an admin (e.g., by checking the presence of a token and admin flag in local storage)
  const isAuthenticated = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Dummy admin data for demonstration purposes
  const admin = {
    username: 'admin',
    email: 'admin@example.com',
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {isAuthenticated ? (
            isAdmin ? (
              <Redirect to="/admin" />
            ) : (
              <Redirect to="/user" />
            )
          ) : (
            <LoginPage />
          )}
        </Route>
        <PrivateRoute path="/admin" component={() => <AdminPage admin={admin} />} isAuthenticated={isAuthenticated && isAdmin} />
      </Switch>
    </Router>
  );
};

export default AdminRole;
