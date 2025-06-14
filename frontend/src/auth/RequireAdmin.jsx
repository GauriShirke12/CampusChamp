import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext"; // Adjust path if needed

const RequireAdmin = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
};

export default RequireAdmin;
