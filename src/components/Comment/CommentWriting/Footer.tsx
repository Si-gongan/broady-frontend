import { useEffect, useState } from 'react';
import { ICurrentRequest } from '../../../types/request';
import BeforeCommentFooter from './BeforeCommentFooter';
import AfterCommentFooter from './AfterCommentFooter';
import CurrentCommentFooter from './CurrentCommentFooter';
import { getExpiredMinute, getKoreanTime } from '../../../utils/time';
import { getRequest } from '../../../api/axios';
import { useRecoilValue } from 'recoil';
import { authTokenState, fcmTokenState } from '../../../states';
import useInterval from '../../../hooks/useInterval';

interface IFooterProps {
  id: string;
  request: ICurrentRequest;
  setRequest: (value: React.SetStateAction<ICurrentRequest>) => void;
  navigation: any;
}

const Footer = ({ id, request, setRequest, navigation }: IFooterProps) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const [commentTimer, setCommentTimer] = useState<number>(7);
  const [status, setStatus] = useState<number>(1); // -1: 해설전, 0: 해설중, 1: 해설완료
  const { isAvailable, isComplete } = request;
  const [isEndComment, setIsEndComment] = useState(false);

  useEffect(() => {
    if (isAvailable && isComplete === false) setStatus(-1);
    if (isAvailable === false && isComplete === false) setStatus(0);
    if (isAvailable === false && isComplete) setStatus(1);
  }, [isAvailable, isComplete]);

  useInterval(() => {
    if (request.expiredAt !== null && getKoreanTime(new Date()) <= new Date(request.expiredAt)) {
      const result = getExpiredMinute(request.expiredAt);
      setCommentTimer(result);
    } else if (status === 0 && request.expiredAt !== null && getKoreanTime(new Date()) > new Date(request.expiredAt)) {
      // 해설중 화면에서 작성중인 의뢰가 시간이 지났을 때
      setStatus(-1);
      getRequest(id, fcmToken, authToken).then((res) => {
        setRequest(res);
      });
    }
  }, 1000);

  // status === -1 : 해설 전, 0 : 해설 중, 1 : 해설 완료
  return (
    <>
      {status === -1 && <BeforeCommentFooter id={id} setStatus={setStatus} setRequest={setRequest} />}
      {status === 0 && (
        <CurrentCommentFooter
          id={id}
          setRequest={setRequest}
          commentTimer={commentTimer}
          setStatus={setStatus}
          setIsEndComment={setIsEndComment}
          navigation={navigation}
        />
      )}
      {status === 1 && <AfterCommentFooter isEndComment={isEndComment} setIsEndComment={setIsEndComment} />}
    </>
  );
};

export default Footer;
