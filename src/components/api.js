import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000'
});
console.log('API base URL:', process.env.REACT_APP_API_URL);

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  logIn: (data) => API.post('/auth/login', data),
};

export const userAPI = {
  getProfile: () => API.get('/users/profile'),
};

