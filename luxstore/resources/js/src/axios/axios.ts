import axios from 'axios';

if (import.meta.env.PROD) {
    axios.defaults.baseURL = 'https://luxtore-production.up.railway.app/api';
} else {
    axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
}
const axiosInstance = axios.create({
    baseURL: axios.defaults.baseURL,
    withCredentials: true,
    withXSRFToken: true,
});

export default axiosInstance;
