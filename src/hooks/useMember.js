import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useMember = () => {
    const { user, loading } = useContext(AuthContext);

    const { data: isMember, isLoading: isMemberLoading } = useQuery({
        queryKey: [user?.email, 'isMember'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            if (user?.email) {
                const res = await fetch(`http://localhost:5000/users/member/${user.email}`);
                const data = await res.json();
                return data.member;
            }
            return false;
        }
    });
    return [isMember, isMemberLoading];
};

export default useMember;