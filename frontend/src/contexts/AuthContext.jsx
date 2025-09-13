import { createContext, useState, useContext, useEffect } from "react";
import { checkAuthStatus } from "../services/auth"; // Import the new function

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Optional: store user data
  const [isLoading, setIsLoading] = useState(true); // Start in a loading state

  useEffect(() => {
    const verifyUser = async () => {
      const response = await checkAuthStatus();
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.user); // Store user data from the backend
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false); // Finished loading
    };

    verifyUser();
  }, []); // The empty array ensures this runs only once on mount

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};