export type RequestAllReturnType = {
  code: number;
  result: {
    posts: {
      id: string;
      createdAt: string;
      photo: string;
      text: string;
    }[];
  };
};

export type RequestReturnType = {
  code: number;
  result: {
    post: {
      id: string;
      createdAt: string;
      photo: string;
      fcmToken: string;
      requestedUser: {
        id: string;
        text: string;
        createdAt: string;
      }[];
      responseUser: {
        id: string;
        text: string;
        userId: string;
        createdAt: string;
        appreciated: boolean;
        appreciatedText: string;
      }[];
      isComplete: boolean;
      expiredAt: string | null;
      isAvailable: boolean;
    };
  };
};

export type ProceedRequestReturnType = {
  code: number;
  result: {
    proceedingPosts: {
      id: string;
      createdAt: string;
      photo: string;
      fcmToken: string;
      requestedUser: {
        id: string;
        text: string;
        createdAt: string;
      }[];
      responseUser: {
        id: string;
        text: string;
        userId: string;
        createdAt: string;
        appreciated: boolean;
        appreciatedText: string;
      }[];
      isComplete: boolean;
      expiredAt: string | null;
      isAvailable: boolean;
    }[];
  };
};

export type CompletedRequestReturnType = {
  code: number;
  result: {
    completedPosts: {
      id: string;
      createdAt: string;
      photo: string;
      fcmToken: string;
      requestedUser: {
        id: string;
        text: string;
        createdAt: string;
      }[];
      responseUser: {
        id: string;
        text: string;
        userId: string;
        createdAt: string;
        appreciated: boolean;
        appreciatedText: string;
      }[];
      isComplete: boolean;
      expiredAt: string | null;
      isAvailable: boolean;
    }[];
  };
};

export type startCommentReturnType = {
  code: number;
  result: {
    expiredDate: Date;
  };
};

export type endCommentReturnType = {
  code: number;
  result: {
    post: {
      id: string;
      createdAt: string;
      photo: string;
      fcmToken: string;
      requestedUser: {
        id: string;
        text: string;
        createdAt: string;
      }[];
      responseUser: {
        id: string;
        text: string;
        userId: string;
        createdAt: string;
        appreciated: boolean;
        appreciatedText: string;
      }[];
      isComplete: boolean;
      expiredAt: string | null;
      isAvailable: boolean;
    };
  };
};

export type ReturnPointListType = {
  code: number;
  result: {
    pointHistories: {
      _id: string;
      date: Date;
      description: string;
      point: number;
    }[];
  };
};
