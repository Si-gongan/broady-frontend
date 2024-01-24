import { useRef } from 'react';
import { CommentServer } from '../api/axios/comment/setting';
import { AxiosError } from 'axios';
import { Alert } from 'react-native';
import { useUserState } from '../providers';

export const useCommentAuth = () => {
  const { logout } = useUserState();

  // alert 중복 방지
  const isErrorAlertRef = useRef(false);

  // 토큰 만료 처리
  CommentServer.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      try {
        const response = error.response;
        const status = response?.status;

        if (status === 401 && !isErrorAlertRef.current) {
          isErrorAlertRef.current = true;
          Alert.alert('세션 만료', '다시 로그인 해주세요.', [
            {
              text: '확인',
              onPress: () => (isErrorAlertRef.current = false),
            },
          ]);

          logout();
          return Promise.reject(error);
        }
      } catch {
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
};
