import { IReqeustListItem } from '../api/axios';

export type AuthStackParamList = {
  인트로: undefined;
  '이메일 회원가입': undefined;
  '이메일 로그인': undefined;
  '닉네임 입력': { type: 'Sigongan' | 'Comment'; token?: string };
  '해설자 온보딩': { token?: string; nickname: string };
};

export type CommentaryTabParamList = {
  Example: undefined;
};

export type SigonganStackParamList = {
  메인: undefined;
  해설의뢰: { url?: string };
  공유선택: { url?: string };
  '해설 진행현황': { item: IReqeustListItem };
  '닉네임 수정': undefined;
  '자주 묻는 질문': undefined;
  사용설명서: undefined;
  '사용설명서 상세': { type: 'App' | 'Photo' | 'Ai' };
};

export type SigonganMainTabParamList = {
  홈: undefined;
  'AI 해설': { url?: string | null };
  마이페이지: undefined;
};
