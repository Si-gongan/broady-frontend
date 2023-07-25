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
  requestedUser: { id: string; text: string; createAt: string }[];
  responseUser: { id: string; text: string; createAt: string }[];
  isComplete: boolean;
  expiredAt: string | null;
  isAvailable: boolean;
};
