import { SCREENS } from '@/constants/screens';

export type CommentTabParamList = {
  [SCREENS.COMMENTSTACK.COMMENTTAB.해설자홈]: undefined;
  [SCREENS.COMMENTSTACK.COMMENTTAB.우수해설]: undefined;
  [SCREENS.COMMENTSTACK.COMMENTTAB.MY의뢰]: undefined;
  [SCREENS.COMMENTSTACK.COMMENTTAB.마이페이지]: undefined;
};

export type CommentStackParamList = {
  [SCREENS.COMMENTSTACK.해설자메인탭]: undefined;
  [SCREENS.COMMENTSTACK.해설자대화방]: {
    postId?: string;
  }
};
