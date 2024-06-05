import axios from 'axios';

// Define your base URL
export const BASE_URL = 'http://localhost:3001/api';

// Create an instance of Axios with the base URL set
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

export default axiosInstance;
