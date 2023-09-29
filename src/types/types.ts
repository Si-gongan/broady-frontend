import { IReqeustListItem } from '../api/axios';

export type AuthStackParamList = {
  인트로: undefined;
  '이메일 회원가입': undefined;
  '이메일 로그인': undefined;
  '닉네임 입력': { type: 'sigongan' | 'comment' };
};

export type CommentaryTabParamList = {
  Example: undefined;
};

export type SigonganStackParamList = {
  메인: undefined;
  해설의뢰: { url?: string };
  '해설 진행현황': { item: IReqeustListItem };
};

export type SigonganMainTabParamList = {
  홈: undefined;
  'AI 채팅': undefined;
  마이페이지: undefined;
};
