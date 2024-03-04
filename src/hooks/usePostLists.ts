import { IPost } from '@/@types/post';
import { getPostListApi } from '@/axios';
import { logError } from '@/library/axios';
import { authTokenState, selectedPostIdAtom, syncPostListAtom } from '@/states';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const limit = 10;

export const usePostLists = () => {
  const [syncPostList, setSyncPostList] = useRecoilState(syncPostListAtom);
  const [selectedPostId, setSelectedPostId] = useRecoilState(selectedPostIdAtom);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const token = useRecoilValue(authTokenState);

  const postList = syncPostList;

  const selectedPost = syncPostList.find((post) => post.id === selectedPostId);

  const getInitialPostList = async () => {
    setIsLoading(true);

    try {
      const response = await getPostListApi({ page: 1, limit: limit, search: searchKeyword, token });
      setSyncPostList([...response.data.result.posts]);
    } catch (error) {
      logError(error);
    }

    setIsLoading(false);
  };

  const getMorePostList = async () => {
    setIsLoading(true);

    try {
      const response = await getPostListApi({
        page: 2,
        limit: limit,
        search: searchKeyword,
        token,
      });
      setSyncPostList([...syncPostList, ...response.data.result.posts]);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const updateSelectedPost = (key: keyof IPost, value: any) => {
    setSyncPostList(
      syncPostList.map((post) => {
        if (post.id === selectedPostId) {
          post[key] = value;
        }
        return post;
      })
    );
  };

  const currentRoomState = {
    isBlocked: selectedPost?.isBlocked || false,
    isPaused: selectedPost?.isPaused || false,
    isComplete: selectedPost?.isComplete || false,
    isPinned: selectedPost?.isPinned || false,
  };

  return {
    selectedPostId,
    getInitialPostList,
    updateSelectedPost,
    setSyncPostList,
    setSelectedPostId,
    selectedPost,
    postList,
    currentRoomState,
  };
};
