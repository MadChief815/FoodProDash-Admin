import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
