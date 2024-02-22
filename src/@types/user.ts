export type TloginFromState = 'Comment' | 'Sigongan' | null;

export interface ICommentUser {
  email: string;
  fcmToken: string;
  nickname: ''; // 만든 직후는 "", 나중에 채워야 함
  isAcceptExtraQuestionNotification: boolean; // 초기값은 true
  isAcceptNewQuestionNotification: boolean; // 초기값은 false
  pointHistories: {
    createdAt: Date;
    description: string;
    point: number;
  }[]; // 초기값은 []
  donateHistories: {
    createdAt: Date;
    description: string;
    point: number;
  }[]; // 초기값은 []
  reportLevel: 0; // 초기값은 0, 스키마 참고
  createdAt: Date;
}

export interface ISigonganUser {
  email: string;
  fcmToken: string;
  nickname: string; // 만든 직후는 "", 나중에 채워야 함
  isAcceptNotification: boolean; // 초기값은 true
  reportLevel: number; // 초기값은 0, 스키마 참고
  createdAt: Date;
}
