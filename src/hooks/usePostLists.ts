import { IPost } from '@/@types/post';
import { IPostReturnType, getPostListApi } from '@/axios';
import { logError } from '@/library/axios';
import { authTokenState, selectedPostIdAtom, syncPostListAtom } from '@/states';
import { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { RecoilState, useRecoilState, useRecoilValue } from 'recoil';

const limit = 10;

export const usePostLists = ({
  postListFetcher,
  postListAtom,
  selectedPostIdAtom,
}: {
  postListFetcher: ({
    page,
    limit,
    search,
    token,
  }: {
    page: number;
    limit: number;
    search: string;
    token: string;
  }) => Promise<AxiosResponse<IPostReturnType>>;
  postListAtom: RecoilState<IPost[]>;
  selectedPostIdAtom: RecoilState<string | null>;
}) => {
  const [syncPostList, setSyncPostList] = useRecoilState(postListAtom);
  const [selectedPostId, setSelectedPostId] = useRecoilState<string | null>(selectedPostIdAtom);
  const [isFetching, setIsFetching] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const isHomeFocused = useRef(false);
  const hasNextPage = useRef(true);
  const page = useRef(1);
  const isMounted = useRef(false);

  const token = useRecoilValue(authTokenState);

  const postList = syncPostList;

  const selectedPost = syncPostList.find((post) => post.id === selectedPostId);

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

  const getInitialPostList = async () => {
    setIsFetching(true);

    try {
      const response = await postListFetcher({ page: 1, limit: limit, search: searchKeyword, token });

      setSyncPostList(response.data.result.posts);

      hasNextPage.current = response.data.result.hasNextPage;
    } catch (error) {
      logError(error);
    }

    setIsFetching(false);
  };

  const getMorePostList = async () => {
    if (!hasNextPage.current) {
    }

    page.current += 1;

    try {
      const response = await getPostListApi({
        page: page.current,
        limit: limit,
        search: searchKeyword,
        token,
      });

      setSyncPostList([...syncPostList, ...response.data.result.posts]);

      hasNextPage.current = response.data.result.hasNextPage;
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const debounceGetMorePostList = () => {
    page.current = 0;

    setIsFetching(true);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      getMorePostList();
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  const onDeleteSearchKeyword = () => {
    onChangeSearchKeyword('');
  };

  const onChangeSearchKeyword = (keyword: string) => {
    hasNextPage.current = true;
    setSyncPostList([]);
    setSearchKeyword(keyword);
  };

  const resetPage = () => {
    page.current = 1;
    isHomeFocused.current = true;
    onChangeSearchKeyword('');
  };

  // 검색어가 변경되면 새로운 검색어로 포스트 리스트를 가져온다.
  useEffect(() => {
    if (isHomeFocused.current) {
      isHomeFocused.current = false;
      return;
    }

    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    debounceGetMorePostList();
  }, [searchKeyword]);

  const currentRoomState = {
    isBlocked: selectedPost?.isBlocked || false,
    isPaused: selectedPost?.isPaused || false,
    isComplete: selectedPost?.isComplete || false,
    isPinned: selectedPost?.isPinned || false,
  };

  return {
    selectedPostId,
    getInitialPostList,
    getMorePostList,
    isFetching,
    updateSelectedPost,
    setSyncPostList,
    setSelectedPostId,
    onDeleteSearchKeyword,
    isHomeFocused,
    resetPage,
    searchKeyword,
    onChangeSearchKeyword,
    selectedPost,
    postList,
    currentRoomState,
  };
};
