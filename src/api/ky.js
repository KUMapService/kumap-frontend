import ky from 'ky';
import { API } from '@constants/route';

let abortControllers = {};

const getAbortKey = (url, method) => {
  const fullUrl = new URL(url, 'http://localhost:51203/api').toString();
  return `${method}:${fullUrl}`;
};

export const kyInstance = ky.create({
  prefixUrl: process.env.REACT_APP_API_URL,
  timeout: 60000,
  hooks: {
    beforeRequest: [
      (request, options) => {
        console.log('Before request - URL:', request.url, 'Method:', request.method);
        const token = localStorage.getItem('access_token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }

        const key = getAbortKey(request.url, request.method);
        console.log('Abort key:', key);
        if (abortControllers[key]) {
          console.log('Aborting previous request for key:', key);
          abortControllers[key].abort();
        }
        const controller = new AbortController();
        abortControllers[key] = controller;

        // request.signal을 직접 수정하지 않고, options에 signal 추가
        options.signal = controller.signal;
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        console.log('After response - Status:', response.status);
        const key = getAbortKey(request.url, request.method);
        delete abortControllers[key];
        return response;
      },
    ],
  },
});

export const authKy = ky.create({
  prefixUrl: process.env.REACT_APP_API_URL,
  timeout: 60000,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    beforeError: [
      async (error) => {
        const { response } = error;
        const originalRequest = error.request;

        // ✅ 1. 401일 경우 리프레시 시도
        if (response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) throw new Error('No refresh token');

            const refreshResp = await kyInstance
              .post(API.AUTH.REFRESH_TOKEN, {
                json: { refreshToken },
              })
              .json();

            localStorage.setItem('access_token', refreshResp.accessToken);

            return kyInstance(originalRequest);
          } catch (err) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
          }
        }

        // ✅ 2. 에러 메시지를 응답에서 파싱해서 에러 객체에 붙이기
        try {
          const resData = await response.clone().json(); // clone 안 하면 body stream 날라감
          console.log(resData.message);
          const customError = new Error(resData.message || '요청 실패');
          customError.name = 'APIError';
          customError.response = response;
          throw customError; // 이거 안 하면 message 안 뜸
        } catch (e) {
          return error; // JSON 파싱 실패했을 때 fallback
        }
      },
    ],
  },
});
