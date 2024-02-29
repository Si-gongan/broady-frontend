import { getPostListApi } from '@/axios';
import { selectedPostIdAtom, syncPostListAtom } from '@/states';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const limit = 10;

export const usePostLists = () => {
  const [syncPostList, setSyncPostList] = useRecoilState(syncPostListAtom);
  const [selectedPostItem, setSelectedPostItem] = useRecoilState(selectedPostIdAtom);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 화면이 다시 mount

  const getPostList = async () => {
    setIsLoading(true);

    try {
      const response = await getPostListApi({ page: 1, limit: limit, search: searchKeyword });
      setSyncPostList([...response.data.result.posts]);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const postList = syncPostList;

  const selectedPost = syncPostList.find((post) => post.id === selectedPostItem);

  return {
    selectedPostItem,
    setSelectedPostItem,
    getPostList,
    selectedPost,
    postList,
  };
};
