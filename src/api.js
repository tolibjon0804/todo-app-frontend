import axios from "axios";

const API = axios.create({
    baseURL: `http://localhost:5000` // Replace with your backend URL
});

// Add token to headers
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `${token}`;
    }
    return req;
});

export default API;