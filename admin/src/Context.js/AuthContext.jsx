import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const authDataContext = createContext();
export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  // Use Render backend in production, localhost in development
  const serverUrl = import.meta.env.VITE_API_URL || 
                   (window.location.hostname === 'localhost' ? "http://localhost:8000" : "https://cev-soft.onrender.com");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(sessionStorage.getItem('adminToken') || '');
  
  useEffect(() => {
    const verifyToken = async () => {
      // Use sessionStorage instead of localStorage - clears when browser closes
      const token = sessionStorage.getItem('adminToken');
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        // Verify token with backend
        const response = await axios.get(`${serverUrl}/api/auth/verify-admin`, {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem('adminToken');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        sessionStorage.removeItem('adminToken');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [serverUrl]);

  const login = (newToken) => {
    // Store in sessionStorage - automatically cleared when browser closes
    sessionStorage.setItem('adminToken', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('adminToken');
    setToken('');
    setIsAuthenticated(false);
  };
  
  const value = {
    serverUrl,
    serverurl: serverUrl,
    token,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <>
      <authDataContext.Provider value={value}>
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      </authDataContext.Provider>
    </>
  );
}

export default AuthContextProvider;
