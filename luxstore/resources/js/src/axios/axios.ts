import axios from 'axios';

if (import.meta.env.PROD) {
    axios.defaults.baseURL = 'https://luxtore-production.up.railway.app';
} else {
    axios.defaults.baseURL = 'http://127.0.0.1:8000';
}
const axiosInstance = axios.create({
    baseURL: `${axios.defaults.baseURL}/api`,
    withCredentials: true,
    withXSRFToken: true,
});

export default axiosInstance;
