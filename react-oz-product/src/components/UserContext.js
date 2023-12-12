import axios from 'axios';
import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';


// Function to get CSRF token from cookies
export const getCsrfToken = () => {
    return Cookies.get('csrftoken'); // Replace with your actual CSRF cookie name if different
  };
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        localStorage.setItem('accessToken', userData.accessToken);
         // Set default Axios Authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.accessToken}`;
        localStorage.setItem('refreshToken', userData.refreshToken);
        localStorage.setItem('username', userData.username);
        setUser(userData);
        console.log('UserContext login:', userData);
    };

    const logout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;