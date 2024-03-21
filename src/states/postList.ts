import { IPost } from '@/@types/post';
import { IPostReturnType, getPostListApi } from '@/axios';
import { atom, selector } from 'recoil';

// export const postListAtom = selector<IPostReturnType>({
//   key: 'postListAtom',
//   get: async ({ get }) => {
//     const response = await getPostListApi(get(postListQuery));

//     return response.data;
//   },
// });

export const syncPostListAtom = atom<IPost[]>({
  key: 'syncPostListAtom',
  default: [],
});

export const pinnedPostListAtom = atom<IPost[]>({
  key: 'pinnedPostListAtom',
  default: [],
});

export const postListQuery = atom<{
  keyword: string;
  page: number;
}>({
  key: 'postListQuery',
  default: {
    keyword: '',
    page: 1,
  },
});

export const selectedPostIdAtom = atom<string | null>({
  key: 'selectedPostIdAtom',
  default: null,
});
