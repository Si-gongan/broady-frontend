import { atom } from 'recoil';
import { IRequest } from '../types/request';

const initialState: IRequest[] = [
  {
    id: 0,
    createdAt: '2023-07-11T03:12:13T',
    content: '고양이가 어떤 모습인지 자세히 설명해주세요.',
    imgSrc: require('../../assets/sample_request.png'),
    status: 0,
  },
  {
    id: 1,
    createdAt: '2023-07-11T03:12:13T',
    content: '질문 내용',
    imgSrc: require('../../assets/sample_request.png'),
    status: 0,
  },
  {
    id: 2,
    createdAt: '2023-07-11T03:12:13T',
    content: '질문 내용',
    imgSrc: require('../../assets/sample_request.png'),
    status: 0,
  },
  {
    id: 3,
    createdAt: '2023-07-11T03:12:13T',
    content: '질문 내용',
    imgSrc: require('../../assets/sample_request.png'),
    status: 0,
  },
  {
    id: 4,
    createdAt: '2023-07-11T03:12:13T',
    content: '질문 내용',
    imgSrc: require('../../assets/sample_request.png'),
    status: 0,
  },
  {
    id: 5,
    createdAt: '2023-07-11T03:12:13T',
    content: '해설 시작한 의뢰',
    imgSrc: require('../../assets/sample_request.png'),
    status: 1,
  },
  {
    id: 6,
    createdAt: '2023-07-11T03:12:13T',
    content: '질문 내용',
    imgSrc: require('../../assets/sample_request.png'),
    status: 1,
  },
  {
    id: 7,
    createdAt: '2023-07-11T03:12:13T',
    content: '질문 내용',
    imgSrc: require('../../assets/sample_request.png'),
    status: 1,
  },
];
export const requestListState = atom({
  key: 'requestListState',
  default: initialState,
});
