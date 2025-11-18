import { createContext } from 'react';

export const authdatecontext = createContext();

const Authcontext = ({ children }) => {
    const serverurl = "http://localhost:8000";
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