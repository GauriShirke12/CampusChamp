import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/authContext"; // Adjust path if necessary

const RequireAdmin = ({ children }) => {
  const { user, isLoggedIn } = useAuth();
  const location = useLocation();

  // Not logged in — redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but not admin — redirect to homepage
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Authorized
  return children;
};

export default RequireAdmin;
