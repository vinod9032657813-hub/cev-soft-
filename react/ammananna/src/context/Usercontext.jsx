import { createContext, useContext, useEffect, useState } from 'react';
import { authdatecontext } from './Authcontext';
import axios from 'axios';

export const userdataContext = createContext();

const Usercontext = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const { serverurl } = useContext(authdatecontext);
    
    const getCurrentUser = async () => {
        try {
            const result = await axios.get(serverurl + "/api/user/getcurrentuser", {
                withCredentials: true
            });
            setUserData(result.data);
            console.log(result.data);
        } catch (error) {
            setUserData(null);
            console.log("Error getting current user:", error);
        }  
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    const value = {
        userData,
        setUserData,
        getCurrentUser
    };

    return (
        <userdataContext.Provider value={value}>
            {children}
        </userdataContext.Provider>
    );
};

export default Usercontext;