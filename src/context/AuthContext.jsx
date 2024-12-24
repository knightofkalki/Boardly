import { createContext, useContext, useState } from 'react';
import { API_URL } from '../shared/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
        localStorage.setItem('token', data.token);
        return true;
      } else {
        const error = await response.json();
        console.error('Login failed:', error);
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const value = {
    currentUser,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};