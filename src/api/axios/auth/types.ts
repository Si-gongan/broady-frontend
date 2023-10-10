export type ILoginReturnType = {
  code: number;
  result: {
    user: {
      id: string;
      email: string;
      nickname: string;
      fcmToken: string;
    };
    token: string;
  };
};
