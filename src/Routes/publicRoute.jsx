import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

const PublicRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    return !isLoggedIn ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
