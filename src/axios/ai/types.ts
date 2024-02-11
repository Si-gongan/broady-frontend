export type IGetChatListReturnType = {
  code: number;
  result: {
    chat: {
      _id: string;
      fcmToken: string;
      chat: {
        _id: string;
        role: 'user' | 'assistant';
        content: string;
        isPhoto: boolean;
        createdAt: string;
      }[];
      data: object | null;
    } | null;
  };
};
