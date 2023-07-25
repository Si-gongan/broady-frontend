export interface IRequest {
  id: string;
  createdAt: Date;
  photo: string;
  text: string;
}

export interface ICurrentRequest {
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
}
