export type IRequestListReturnType = {
  code: number;
  result: {
    posts: IReqeustListItem[];
  };
};

export type IReqeustListItem = {
  id: string;
  createdAt: string;
  photo: string;
  fcmToken: string;
  requestedUser: { id: string; text: string; createdAt: string; appreciated?: boolean; userId?: string }[];
  responseUser: { id: string; text: string; createdAt: string; appreciated: boolean; userId: string }[];
  isComplete: boolean;
  expiredAt: string | null;
  isAvailable: boolean;
};
