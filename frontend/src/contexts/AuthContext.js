import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          return JSON.parse(localStorage.getItem("user"));
        } else {
          localStorage.clear(); // Token expired
        }
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.clear();
      }
    }
    return null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // Sync between tabs
  useEffect(() => {
    const syncAuth = () => {
      const newUser = localStorage.getItem("user");
      const newToken = localStorage.getItem("token");
      setUser(newUser ? JSON.parse(newUser) : null);
      setToken(newToken || null);
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const login = ({ user, token }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
