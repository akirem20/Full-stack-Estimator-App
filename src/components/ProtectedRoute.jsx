// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('token'); // check login
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
