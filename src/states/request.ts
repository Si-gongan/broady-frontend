import { atom } from 'recoil';
import { IRequest } from '../types/request';

// TODO: 더미 데이터. 데이터 생기면 빈 배열로 두기.
const initialState: IRequest[] = [
  {
    id: 0,
    createdAt: new Date('2023-07-22T13:40:13Z'),
    text: '고양이가 어떤 모습인지 자세히 설명해주세요.',
    photo: '../../assets/sample_request.png',
  },
  {
    id: 1,
    createdAt: new Date('2023-07-22T13:22:13Z'),
    text: '질문 내용1',
    photo: '../../assets/sample_request.png',
  },
  {
    id: 2,
    createdAt: new Date('2023-07-22T12:12:13Z'),
    text: '질문 내용2',
    photo: '../../assets/sample_request.png',
  },
  {
    id: 3,
    createdAt: new Date('2023-07-21T03:12:13Z'),
    text: '질문 내용3',
    photo: '../../assets/sample_request.png',
  },
  {
    id: 4,
    createdAt: new Date('2023-07-20T03:12:13Z'),
    text: '질문 내용4',
    photo: '../../assets/sample_request.png',
  },
  {
    id: 5,
    createdAt: new Date('2023-07-19T03:12:13Z'),
    text: '질문 내용5',
    photo: '../../assets/sample_request.png',
  },
  {
    id: 6,
    createdAt: new Date('2023-07-18T03:12:13Z'),
    text: '질문 내용6',
    photo: '../../assets/sample_request.png',
  },
  {
    id: 7,
    createdAt: new Date('2023-07-18T03:12:13Z'),
    text: '질문 내용7',
    photo: '../../assets/sample_request.png',
  },
];

interface ITimer {
  id: number;
  timerId: string | number | NodeJS.Timer | undefined;
}

const commentTimerInit: ITimer[] = [];

const randomInt = Math.floor(Math.random() * 100);
export const requestListState = atom({
  key: `requestListState${randomInt}`,
  default: initialState,
});

export const commentTimerListState = atom({
  key: `commentTimerState${randomInt}`,
  default: commentTimerInit,
});
