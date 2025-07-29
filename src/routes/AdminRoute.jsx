import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (user && isAdmin) {
        return children;
    }

    // Redirect non-admins to the home page
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;