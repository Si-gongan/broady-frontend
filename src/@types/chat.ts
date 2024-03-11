import { IsoString } from './date';

export interface IChat {
  id: string;
  type: 'sigongan' | 'comment' | 'admin' | 'ai';
  email: string;
  text: string;
  createdAt: IsoString;
  isReported: boolean | undefined;
  reason: string | undefined;
}
