import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("student");
    if (savedUser) setStudent(JSON.parse(savedUser));
  }, []);

  const login = (data) => {
    setStudent(data);
    localStorage.setItem("student", JSON.stringify(data));
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem("student");
  };

  return (
    <AuthContext.Provider value={{ student, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);