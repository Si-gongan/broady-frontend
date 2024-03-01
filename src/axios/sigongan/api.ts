import { SigonganServer } from './setting';
import { IPostRegisterReturnType, IPostReturnType } from './types';
// import type { IAlarmStatusReturnType, IRequestListReturnType } from './types';

// export const GetRequestList = async (fcmToken: string) => {
//   return await SigonganServer.get<IRequestListReturnType>('/post/user', {
//     headers: {
//       fcmToken,
//       authorization: 0,
//     },
//   });
// };

export const getPostListApi = async ({ page, limit, search }: { page?: number; limit?: number; search?: string }) => {
  return await SigonganServer.get<IPostReturnType>(
    `/sigongan-user/post?${page && `page=${page}`}${limit && `&limit=${limit}`}${search && `&search=${search}`}
  }`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

// {
// 	file: FormData,
// 	text: string, // 질문 내용
// 	deletePostId?: string // 제보 받아서 새로운 글을 작성한다면, 그 제보 받은 글 id (지우고 새로 업로드 해야해서)
// }

// {
// 	authorization: 'Bearer [token]',
// 	'Content-Type': 'application/json'
// }

export const registerPostApi = async (text: string, file: FormData, deletePostId?: string) => {
  return await SigonganServer.post<IPostRegisterReturnType>('/sigongan-user/post', {
    file,
    text,
    deletePostId,
  });
};

// export const RegisterRequest = async (text: string, fileUri: string, fcmToken: string) => {
//   const localUri = fileUri;
//   const filename = localUri.split('/').pop();
//   const match = /\.(\w+)$/.exec(filename ?? '');
//   const type = match ? `image/${match[1]}` : `image`;

//   const formData = new FormData();
//   formData.append('file', { uri: fileUri, name: filename, type });
//   formData.append('text', text);

//   return await SigonganServer.post('/post/user', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       fcmToken,
//       authorization: 0,
//     },
//   });
// };

// export const AddQuestion = async (postId: string, text: string, fcmToken: string) => {
//   return await SigonganServer.put(
//     '/post/user',
//     {
//       postId,
//       text,
//     },
//     {
//       headers: {
//         fcmToken,
//         authorization: 0,
//       },
//     }
//   );
// };

// export const DeleteQuestion = async (postId: string, fcmToken: string) => {
//   return await SigonganServer.delete('/post', {
//     data: {
//       postId,
//     },
//     headers: {
//       fcmToken,
//       authorization: 0,
//     },
//   });
// };

// export const AddThanks = async (postId: string, answerId: string, text: string, fcmToken: string) => {
//   return await SigonganServer.post(
//     '/post/appreciate',
//     {
//       postId,
//       answerId,
//       text,
//     },
//     {
//       headers: {
//         fcmToken,
//         authorization: 0,
//       },
//     }
//   );
// };

// export const GetAlarmStatus = async (fcmToken: string) => {
//   return await SigonganServer.get<IAlarmStatusReturnType>('/user/status', {
//     headers: {
//       fcmToken,
//       authorization: 0,
//     },
//   });
// };

// export const ChangeAlarmStatus = async (isAccepted: boolean, fcmToken: string) => {
//   return await SigonganServer.put(
//     '/user/status',
//     {
//       isAccepted,
//     },
//     {
//       headers: {
//         fcmToken,
//         authorization: 0,
//       },
//     }
//   );
// };

// export const ReportPost = async (
//   postId: string,
//   type: string,
//   reason: string,
//   text: string,
//   userId: string | null,
//   fcmToken: string
// ) => {
//   return await SigonganServer.post(
//     '/report/post',
//     {
//       postId,
//       type,
//       reason,
//       text,
//       userId,
//     },
//     {
//       headers: {
//         fcmToken,
//         authorization: 0,
//       },
//     }
//   );
// };
