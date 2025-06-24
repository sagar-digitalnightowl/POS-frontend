import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

// Interceptor to add token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiCall = async ({ method, url, data, params }) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
    });
    return response;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};
