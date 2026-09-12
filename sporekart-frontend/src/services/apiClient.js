import axios from 'axios';

// Base Axios instance pointing to Spring Boot backend API
const apiClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Required for HttpOnly Refresh Token cookies
});

// Request Interceptor: Attach JWT Access Token to Bearer Header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sporekart_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle RFC 7807 Problem Details Error Responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      const problem = error.response.data;
      console.warn(`[API Error ${problem.status || error.response.status}] [TraceID: ${problem.traceId || 'N/A'}]:`, problem.detail || problem.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
