import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);


  // restore token on refresh
  useEffect(() => {

    const storedToken =
      localStorage.getItem("token");

    if (storedToken) {

      setToken(storedToken);

      setIsAuthenticated(true);

      // attach token to axios
      API.defaults.headers.Authorization =
        `Bearer ${storedToken}`;

    }

    setLoading(false);

  }, []);


  const login = (newToken) => {

    localStorage.setItem("token", newToken);

    setToken(newToken);

    setIsAuthenticated(true);

    API.defaults.headers.Authorization =
      `Bearer ${newToken}`;
  };


  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);

    setIsAuthenticated(false);

    delete API.defaults.headers.Authorization;
  };


  return (

    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
        loading
      }}
    >

      {children}

    </AuthContext.Provider>

  );
};


export const useAuth = () =>
  useContext(AuthContext);
