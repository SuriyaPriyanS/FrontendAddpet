// src/Providers/AuthProvider.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Check for logged in user on mount
    const checkLoggedInUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/user', { withCredentials: true });
        setLoggedInUser(res.data.user);
      } catch (error) {
        console.error('Error fetching logged in user:', error);
      }
    };
    checkLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
