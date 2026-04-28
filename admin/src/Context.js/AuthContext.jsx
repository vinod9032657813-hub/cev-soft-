import { createContext, useState, useEffect } from 'react';

export const authDataContext = createContext();

function AuthContextProvider({ children }) {
  const serverUrl = import.meta.env.VITE_API_URL || "https://backend-of-cevsoft.onrender.com";
  
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

    // Wake up backend on load
    fetch(`${serverUrl}/`).catch(() => {});

    // Keep backend alive every 10 minutes
    const keepAlive = setInterval(() => {
      fetch(`${serverUrl}/`).catch(() => {});
    }, 10 * 60 * 1000);

    return () => clearInterval(keepAlive);
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
