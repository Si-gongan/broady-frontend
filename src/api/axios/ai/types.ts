export type IMessageType = {
  type: 'text' | 'image';
  content: string;
  role: 'user' | 'assistant';
};

export type ImageChatReturnType = {
  message: [string, number];
  data: object | null;
};
