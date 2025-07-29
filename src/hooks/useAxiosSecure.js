import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthProvider';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase/firebase.config';

const auth = getAuth(app);

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    
    axiosSecure.interceptors.request.use(function (config) {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    user.getIdToken().then(token => {
                        config.headers.authorization = `Bearer ${token}`;
                        resolve(config);
                    });
                } else {
                    resolve(config);
                }
            });
        });
    }, function (error) {
        return Promise.reject(error);
    });


    
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response?.status;
        
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;