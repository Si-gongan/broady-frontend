import axios from 'axios';
import { API_SERVER_URL, AI_API_SERVER_URL } from '@env';

export const Server = axios.create({
  baseURL: API_SERVER_URL,
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AIServer = axios.create({
  baseURL: AI_API_SERVER_URL,
  timeout: 25000,
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
