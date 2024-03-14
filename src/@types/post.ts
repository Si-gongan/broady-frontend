import { IChat } from './chat';
import { IsoString } from './date';

export interface IPost {
  id: string; // 글 고유 id

  writerEmail: string;
  photo: string; // 도메인은 빠져있는 url
  title: string;

  lastChat: string; // 마지막 대화
  unreadPostCount: number; // 안 읽은 대화 수

  isPinned: boolean; // 찜하기 여부
  isPaused: boolean; // 제보 받았는 지 여부 (사진 다시 선택하기 버튼 노출)
  isBlocked: boolean; // 신고 받았는 지 여부 (고객센터 버튼 노출)
  isComplete: boolean; // 해설이 끝났는 지

  availabilityState: {
    commentaryEmail: string | ''; // 현재 작성중인 해설자의 이메일 (없으면 "")
    expiredAt: Date; // 해설자의 작성 기한
  };

  chat: IChat[];
  createdAt: IsoString;
  updatedAt: IsoString;
}

export interface challengePost {
  id: string;
  title: string;
  photo: string;
  createdAt: IsoString;
  comments: {
    email: string;
    text: string;
    isBest: boolean;
    createdAt: IsoString;
  }[];
}
