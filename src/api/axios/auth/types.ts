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
