import { IPost, challengePost } from '@/@types/post';
import { SCREENS } from '@/constants/screens';

export type CommentTabParamList = {
  [SCREENS.COMMENTSTACK.COMMENTTAB.해설자홈]: undefined;
  [SCREENS.COMMENTSTACK.COMMENTTAB.우수해설]: undefined;
  [SCREENS.COMMENTSTACK.COMMENTTAB.MY의뢰]: undefined;
  [SCREENS.COMMENTSTACK.COMMENTTAB.마이페이지]: undefined;
};

export type CommentStackParamList = {
  [SCREENS.COMMENTSTACK.해설자메인탭]: undefined;
  [SCREENS.COMMENTSTACK.해설자일반해설방]: {
    post?: IPost;
  }
  [SCREENS.COMMENTSTACK.해설자도전해설방]: {
    post?: challengePost;
  }
  [SCREENS.COMMENTSTACK.해설자닉네임설정]: undefined;
  [SCREENS.COMMENTSTACK.해설자설정]: undefined;
  [SCREENS.COMMENTSTACK.해설자알림설정]: undefined;
  [SCREENS.COMMENTSTACK.해설자기부]: undefined;
  [SCREENS.COMMENTSTACK.해설자환급]: undefined;
};


