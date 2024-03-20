import { authTokenState } from '@/states';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

export const SigonganServer = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_SERVER_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Server Setting
SigonganServer.interceptors.request.use(
  (config) => {
    // const accessToken = useRecoilValue(authTokenState); // Recoil 상태 가져오기
    // if (accessToken) {
    //   config.headers['Authorization'] = `Bearer ${accessToken}`;
    // }
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
