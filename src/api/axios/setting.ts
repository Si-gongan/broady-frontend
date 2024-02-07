import axios from 'axios';

export const Server = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_SERVER_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AIServer = axios.create({
  baseURL: process.env.EXPO_PUBLIC_AI_API_SERVER_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Server Setting
Server.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AI Server Setting
AIServer.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AIServer.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
