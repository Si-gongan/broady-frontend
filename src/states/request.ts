import { atom } from 'recoil';
import { IRequest } from '../types/request';

// status : 0 해설 의뢰 / 1 : 작성 중 / 2 : 완료
const initialState: IRequest[] = [
  {
    id: 0,
    createdAt: '2023-07-22T13:40:13Z',
    content: '고양이가 어떤 모습인지 자세히 설명해주세요.',
    imgSrc: require('../../assets/sample_request.png'),
    status: -1,
    commentTimer: 10,
  },
  {
    id: 1,
    createdAt: '2023-07-22T13:22:13Z',
    content: '질문 내용1',
    imgSrc: require('../../assets/sample_request.png'),
    status: -1,
    commentTimer: 10,
  },
  {
    id: 2,
    createdAt: '2023-07-22T12:12:13Z',
    content: '질문 내용2',
    imgSrc: require('../../assets/sample_request.png'),
    status: -1,
    commentTimer: 10,
  },
  {
    id: 3,
    createdAt: '2023-07-21T03:12:13Z',
    content: '질문 내용3',
    imgSrc: require('../../assets/sample_request.png'),
    status: -1,
    commentTimer: 10,
  },
  {
    id: 4,
    createdAt: '2023-07-20T03:12:13Z',
    content: '질문 내용4',
    imgSrc: require('../../assets/sample_request.png'),
    status: -1,
    commentTimer: 10,
  },
  {
    id: 5,
    createdAt: '2023-07-19T03:12:13Z',
    content: '질문 내용5',
    imgSrc: require('../../assets/sample_request.png'),
    status: -1,
    commentTimer: 10,
  },
  {
    id: 6,
    createdAt: '2023-07-18T03:12:13Z',
    content: '질문 내용6',
    imgSrc: require('../../assets/sample_request.png'),
    status: -1,
    commentTimer: 10,
  },
  {
    id: 7,
    createdAt: '2023-07-18T03:12:13Z',
    content: '질문 내용7',
    imgSrc: require('../../assets/sample_request.png'),
    status: -1,
    commentTimer: 10,
  },
];

const randomInt = Math.floor(Math.random() * 100);
export const requestListState = atom({
  key: `requestListState${randomInt}`,
  default: initialState,
});
