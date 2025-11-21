
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

  return (
    <div>
      <Routes>
        <Route path='/Login' element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/Add' element={<ProtectedRoute><Add /></ProtectedRoute>} />
        <Route path='/Lists' element={<ProtectedRoute><Lists /></ProtectedRoute>} />
        <Route path='/Orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path='*' element={<Navigate to={isAuthenticated ? "/" : "/Login"} replace />} />
      </Routes>
    </div>
  );
};

export default App;