import axios from 'axios';

export const CommentServer = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_SERVER_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// CommentServer Setting
CommentServer.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// CommentServer.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
