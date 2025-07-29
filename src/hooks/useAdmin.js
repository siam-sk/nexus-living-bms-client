import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);

    
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            if (user?.email) {
                
                const res = await fetch(`http://localhost:5000/users/admin/${user.email}`);
                const data = await res.json();
                return data.admin;
            }
            return false;
        }
    });
    return [isAdmin, isAdminLoading];
};

export default useAdmin;