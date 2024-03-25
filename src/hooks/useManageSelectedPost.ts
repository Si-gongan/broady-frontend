import { changePinStatusApi, deletePostApi } from '@/axios';
import { showCheckToast } from '@/library/toast/toast';
import { authTokenState } from '@/states';
import { selectModeAtom } from '@/states/selectMode';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

export const useManageSelectedPost = ({ onDeletePostFinished }: { onDeletePostFinished: () => void }) => {
  const [isSelectMode, setIsSelectMode] = useRecoilState(selectModeAtom);

  const [selectedPostArray, setSelectedPostArray] = useState<string[]>([]);

  const token = useRecoilValue(authTokenState);

  const onPressSelectPost = (postId: string) => {
    if (selectedPostArray.includes(postId)) {
      setSelectedPostArray((prev) => prev.filter((id) => id !== postId));
    } else {
      setSelectedPostArray((prev) => [...prev, postId]);
    }
  };

  const onPressSelectMode = () => {
    setIsSelectMode((prev) => !prev);
  };

  const onPressCancelSelectMode = () => {
    setIsSelectMode(false);
    setSelectedPostArray([]);
  };

  const onPressDeleteSelectedPost = async () => {
    // delete selected post

    const response = await Promise.all(
      selectedPostArray.map((postId) => {
        return changePinStatusApi(postId, false, token);
      })
    );

    setIsSelectMode(false);
    setSelectedPostArray([]);

    onDeletePostFinished();

    showCheckToast('선택한 해설이 찜 목록에서 삭제되었어요!', null);
    AccessibilityInfo.announceForAccessibility('선택한 해설이 찜 목록에서 삭제되었어요!');
  };

  const isSelectedPost = (postId: string) => {
    return selectedPostArray.includes(postId);
  };

  const reset = () => {
    setIsSelectMode(false);
    setSelectedPostArray([]);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset();
      };
    }, [])
  );

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return {
    isSelectMode,
    selectedArrayLength: selectedPostArray.length,
    isSelectedPost,
    onPressSelectPost,
    onPressSelectMode,
    onPressCancelSelectMode,
    onPressDeleteSelectedPost,
  };
};
