import { createContext, useState, useEffect } from 'react';

export const authDataContext = createContext();

function AuthContextProvider({ children }) {
  const serverUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const login = (newToken) => {
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
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
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContextProvider;
