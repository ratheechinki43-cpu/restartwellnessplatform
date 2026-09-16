import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('restart_auth_token'));
  const [isLoading, setIsLoading] = useState(true);

  // Check token on initial load
  useEffect(() => {
    async function fetchCurrentUser() {
      const storedToken = localStorage.getItem('restart_auth_token');
      const storedUser = localStorage.getItem('restart_user');

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse cached user");
        }
      }

      if (storedToken) {
        try {
          const response = await fetch(API_ENDPOINTS.AUTH_ME, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            localStorage.setItem('restart_user', JSON.stringify(userData));
          }
        } catch (error) {
          console.warn("Backend auth check offline, using cached/demo user state.");
        }
      }
      setIsLoading(false);
    }

    fetchCurrentUser();
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || 'Invalid email or password');
      }

      const data = await response.json();
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem('restart_auth_token', data.access_token);
      localStorage.setItem('restart_user', JSON.stringify(data.user));
      return { success: true };
    } catch (error) {
      // Fallback for offline or local demo mode when backend is unreachable
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        const demoUser = {
          id: 'demo-123',
          name: email.split('@')[0] || 'Wellness Member',
          email: email,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`
        };
        const demoToken = 'demo-jwt-token';
        setToken(demoToken);
        setUser(demoUser);
        localStorage.setItem('restart_auth_token', demoToken);
        localStorage.setItem('restart_user', JSON.stringify(demoUser));
        return { success: true, isDemo: true };
      }
      return { success: false, error: error.message };
    }
  };

  // Sign up handler
  const signup = async (name, email, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH_REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || 'Registration failed. Please check your information.');
      }

      const data = await response.json();
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem('restart_auth_token', data.access_token);
      localStorage.setItem('restart_user', JSON.stringify(data.user));
      return { success: true };
    } catch (error) {
      // Fallback demo mode if server offline
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        const demoUser = {
          id: `user-${Date.now()}`,
          name: name,
          email: email,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`
        };
        const demoToken = 'demo-jwt-token';
        setToken(demoToken);
        setUser(demoUser);
        localStorage.setItem('restart_auth_token', demoToken);
        localStorage.setItem('restart_user', JSON.stringify(demoUser));
        return { success: true, isDemo: true };
      }
      return { success: false, error: error.message };
    }
  };

  // Logout handler
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('restart_auth_token');
    localStorage.removeItem('restart_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user,
        isLoading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
