import { IPost } from '@/@types/post';

// export type IRequestListReturnType = {
//   code: number;
//   result: {
//     posts: IReqeustListItem[];
//   };
// };

// export type IReqeustListItem = {
//   id: string;
//   createdAt: string;
//   photo: string;
//   fcmToken: string;
//   requestedUser: {
//     id: string;
//     text: string;
//     createdAt: string;
//     appreciated?: boolean;
//     userId?: string;
//     appreciatedText?: string;
//     appreciatedDate?: string;
//   }[];
//   responseUser: {
//     id: string;
//     text: string;
//     createdAt: string;
//     appreciated: boolean;
//     userId: string;
//     appreciatedText?: string;
//     appreciatedDate?: string;
//   }[];
//   isComplete: boolean;
//   expiredAt: string | null;
//   isAvailable: boolean;
//   updatedAt: string;
// };

// export type IAlarmStatusReturnType = {
//   code: number;
//   result: {
//     isAccepted: boolean;
//   };
// };

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
