import axios from 'axios';

export const AuthServer = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_SERVER_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Server Setting
AuthServer.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AuthServer.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
