export type ISigonganLoginReturnType = {
  statusCode: number;
  result: {
    sigonganUser: {
      email: string;
      fcmToken: string;
      nickname: string;
      isAcceptNotification: boolean;
      reportLevel: number;
      createdAt: Date;
    };
    token: string;
  };
};

export type ICommentLoginReturnType = {
  statusCode: 200;
  result: {
    commentUser: {
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
    };
    token: string;
  };
};

export type ISigonganRegisterReturnType = {
  statusCode: 201;
  result: {
    sigonganUser: {
      email: string;
      fcmToken: string;
      nickname: string; // 만든 직후는 "", 나중에 채워야 함
      isAcceptNotification: boolean; // 초기값은 true
      reportLevel: number; // 초기값은 0, 스키마 참고
      createdAt: Date;
    };
    token: string;
  };
};

export type ICommentRegisterReturnType = {
  statusCode: 201;
  result: {
    commentUser: {
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
    };
    token: string;
  };
};
