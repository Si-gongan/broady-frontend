import { IsoString } from '@/@types/date';
import { IPost } from '@/@types/post';

export type IUserInfoReturnType = {
  statusCode: 200;
  result: {
    sigonganUser: {
      email: string;
      fcmToken: string;
      nickname: string; // 만든 직후는 "", 나중에 채워야 함
      isAcceptNotification: boolean; // 초기값은 true
      reportLevel: number; // 초기값은 0, 스키마 참고
      createdAt: Date;
    };
  };
};

export type IPostReturnType = {
  statusCode: 200;
  result: {
    posts: IPost[];
    hasPrevPage: boolean; // 이전 페이지가 존재하는지 여부 (limit, page 있을 때 사용)
    prevPage: number | null; // 이전 페이지가 있다면, 그 이전페이지 number (limit, page 있을 때 사용)
    hasNextPage: boolean; // 다음 페이지가 존재하는지 여부 (limit, page 있을 때 사용)
    nextPage: number | null; // 다음 페이지가 있다면, 그 다음페이지 number (limit, page 있을 때 사용)
    totalPages: number; // 총 페이지 수 (limit, page 있을 때 사용)
  };
};

export type IPostRegisterReturnType = {
  code: number;
  result: {
    post: IPost;
  };
};

export type IRequestImageToAiReturnType = {
  code: number;
  result: {
    chat: {
      role: 'user' | 'assistant';
      type: 'text' | 'image';
      content: string; // image면 url(도메인을 직접 붙여야 함)
      createdAt: Date;
    }[];
  };
};

export type IRequestAdditionalReturnType = {
  statusCode: number;
  result: {
    post: IPost;
  };
};
