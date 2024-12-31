import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check for the token in localStorage or cookies
  const tokenFromLocalStorage = localStorage.getItem("token");
  const tokenFromCookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  const isAuthenticated = tokenFromLocalStorage || tokenFromCookies;

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
