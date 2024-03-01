import { getPostListApi } from '@/axios';
import { selectedPostIdAtom, syncPostListAtom } from '@/states';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const limit = 10;

export const usePostLists = () => {
  const [syncPostList, setSyncPostList] = useRecoilState(syncPostListAtom);
  const [selectedPostId, setSelectedPostId] = useRecoilState(selectedPostIdAtom);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const selectedPost = syncPostList.find((post) => post.id === selectedPostId);

  const currentRoomState = {
    isBlocked: selectedPost?.isBlocked || false,
    isPaused: selectedPost?.isPaused || false,
    isComplete: selectedPost?.isComplete || false,
    isPinned: selectedPost?.isPinned || false,
  };

  return {
    selectedPostId,
    setSelectedPostId,
    getPostList,
    selectedPost,
    postList,
    currentRoomState,
  };
};
