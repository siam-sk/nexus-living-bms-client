import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useMember = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: isMember, isLoading: isMemberLoading } = useQuery({
        queryKey: [user?.email, 'isMember'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/users/member/${user.email}`);
                return res.data.member;
            }
            return false;
        }
    });
    return [isMember, isMemberLoading];
};

export default useMember;