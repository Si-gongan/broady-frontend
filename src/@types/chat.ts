export interface IChat {
  id: string;
  type: 'sigongan' | 'comment' | 'admin';
  email: string;
  text: string;
  createdAt: Date;
  isReported: boolean | undefined;
  reason: string | undefined;
}
