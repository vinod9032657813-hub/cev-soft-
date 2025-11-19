
import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Add from './Pages.js/Add';
import Home from './Pages.js/Home';
import Login from './Pages.js/Login';
import Lists from './Pages.js/Lists';
import Orders from './Pages.js/Orders';
import Layout from './Component.js/Layout';
import { authDataContext } from './Context.js/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(authDataContext);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/Login" replace />;
};

const App = () => {
  // Wake up the server when admin panel loads
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        console.log('🔄 Waking up server...');
        const response = await fetch('https://cev-soft.onrender.com');
        if (response.ok) {
          console.log('✅ Server is awake!');
        }
      } catch (error) {
        console.log('⚠️ Server wake-up ping sent (may take 30-60s to respond)');
      }
    };

    wakeUpServer();

    // Ping server every 5 minutes while admin panel is open
    const interval = setInterval(wakeUpServer, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/Add' element={<ProtectedRoute><Add /></ProtectedRoute>} />
        <Route path='/Lists' element={<ProtectedRoute><Lists /></ProtectedRoute>} />
        <Route path='/Orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;