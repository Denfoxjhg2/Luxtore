import axios from 'axios';

axios.defaults.withCredentials = true; 
const API_URL = window.location.origin; 

export default {
    async register(userData: { email: string; password: string }) {
    return await axios.post(`${API_URL}/register`, userData);
    },
    async login(credentials: { email: string; password: string }) {
    return await axios.post(`${API_URL}/login`, credentials);
    },
    async logout() {
        return await axios.post(`${API_URL}/logout`);
    },
    async getUser() {
        return await axios.get(`${API_URL}/user`);
    },
};