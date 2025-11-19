import { createContext } from 'react';

export const authdatecontext = createContext();

const Authcontext = ({ children }) => {
    // Use environment variable for production, fallback to localhost for development
    const serverurl = import.meta.env.VITE_API_URL || 
                     (window.location.hostname === 'localhost' ? "http://localhost:8000" : "https://backend-of-cevsoft.onrender.com");
    
    console.log('🔗 API URL:', serverurl); // Debug log
    
    const value = {
        serverurl
    };
    
    return (
        <authdatecontext.Provider value={value}>
            {children}
        </authdatecontext.Provider>
    );
};

export default Authcontext;