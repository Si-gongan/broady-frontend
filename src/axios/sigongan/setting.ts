import axios from 'axios';

export const SigonganServer = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_SERVER_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Server Setting
SigonganServer.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

SigonganServer.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
