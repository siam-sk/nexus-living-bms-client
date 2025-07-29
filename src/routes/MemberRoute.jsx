import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useMember from '../hooks/useMember';

const MemberRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isMember, isMemberLoading] = useMember();
    const location = useLocation();

    if (loading || isMemberLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (user && isMember) {
        return children;
    }

    // Redirect non-members to the home page
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default MemberRoute;