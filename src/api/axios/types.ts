export type LoginReturnType = {
  code: number;
  result: {
    user: {
      id: string;
      email: string;
      fcmToken: string;
    };
    token: string;
  };
};

export type RequestAllReturnType = {
  code: number;
  result: {
    posts: {
      id: number;
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
      createdAt: Date;
      photo: string;
      fcmToken: string;
      requestedUser: {
        id: string;
        text: string;
        createdAt: Date;
      }[];
      responseUser: {
        id: string;
        text: string;
        userId: string;
        createdAt: string;
        appreciated: boolean;
      }[];
      isComplete: boolean;
      expiredAt: Date | null;
      isAvailable: boolean;
    };
  };
};

export type ProceedRequestReturnType = {
  code: number;
  result: {
    proceedingPosts: {
      id: string;
      createdAt: Date;
      photo: string;
      fcmToken: string;
      requestedUser: {
        id: string;
        text: string;
        createdAt: Date;
      }[];
      responseUser: {
        id: string;
        text: string;
        userId: string;
        createdAt: string;
        appreciated: boolean;
      }[];
      isComplete: boolean;
      expiredAt: Date | null;
      isAvailable: boolean;
    }[];
  };
};

export type CompletedRequestReturnType = {
  code: number;
  result: {
    completedPosts: {
      id: string;
      createdAt: Date;
      photo: string;
      fcmToken: string;
      requestedUser: {
        id: string;
        text: string;
        createdAt: Date;
      }[];
      responseUser: {
        id: string;
        text: string;
        userId: string;
        createdAt: string;
        appreciated: boolean;
      }[];
      isComplete: boolean;
      expiredAt: Date | null;
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
      createdAt: Date;
      photo: string;
      fcmToken: string;
      requestedUser: {
        id: string;
        text: string;
        createdAt: Date;
      }[];
      responseUser: {
        id: string;
        text: string;
        userId: string;
        createdAt: string;
        appreciated: boolean;
      }[];
      isComplete: boolean;
      expiredAt: Date | null;
      isAvailable: boolean;
    };
  };
};
