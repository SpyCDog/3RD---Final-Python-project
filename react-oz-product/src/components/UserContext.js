import axios from "axios";
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    localStorage.setItem("accessToken", userData.accessToken);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userData.accessToken}`;
    localStorage.setItem("refreshToken", userData.refreshToken);
    localStorage.setItem("username", userData.username);
    setUser(userData);
    console.log("UserContext login:", userData);
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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
