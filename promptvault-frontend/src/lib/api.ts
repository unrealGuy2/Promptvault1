// promptvault-frontend/src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Your backend URL
});

// This interceptor MUST run before every request
api.interceptors.request.use(
  (config) => {
    // Check only works on the client-side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      // console.log('Interceptor: Attaching token:', token); // Keep this for debugging
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        // Ensure no old Authorization header lingers if token is removed
        delete config.headers['Authorization'];
      }
    }
    return config;
  },
  (error) => {
    // console.error("Interceptor Error:", error); // Optional: log interceptor errors
    return Promise.reject(error);
  }
);

// Add an interceptor for responses, useful for debugging 401s
api.interceptors.response.use(
  (response) => response, // Simply return successful responses
  (error) => {
    console.error("API Response Error:", error.response?.status, error.config?.url, error.message);
    // Potentially handle global 401 errors here (e.g., redirect to login)
    return Promise.reject(error);
  }
);


export default api;