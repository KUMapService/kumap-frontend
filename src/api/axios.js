import axios from 'axios';
import { API } from '@constants/route';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

authInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

authInstance.interceptors.response.use(
  (response) => response, // 정상 응답 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // 401 에러(Unauthorized) && 재시도한 요청이 아닐 때
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        // 리프레시 토큰 요청
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const { data } = await instance.post(API.AUTH.REFRESH_TOKEN, { refreshToken });

        // 새로운 액세스 토큰 저장
        localStorage.setItem('access_token', data.accessToken);

        // 요청 헤더 업데이트 후 재요청
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return authInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login'; // 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
