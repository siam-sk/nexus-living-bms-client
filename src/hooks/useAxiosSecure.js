import axios from 'axios';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebase.config'; // adjust path if different

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

// Attach fresh Firebase ID token on every request
axiosSecure.interceptors.request.use(async (config) => {
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken(); // cached; no force refresh
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

// Do not hard-redirect on 401/403; let pages handle it
axiosSecure.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  }
);

export default function useAxiosSecure() {
  return axiosSecure;
}