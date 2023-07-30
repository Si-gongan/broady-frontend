export interface IRequest {
  id: string;
  createdAt: string;
  photo: string;
  text: string;
}

export interface ICurrentRequest {
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
}
