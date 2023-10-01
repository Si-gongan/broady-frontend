import { useEffect, useState } from 'react';
import { ICurrentRequest } from '../../../types/request';
import BeforeCommentFooter from './BeforeCommentFooter';
import AfterCommentFooter from './AfterCommentFooter';
import CurrentCommentFooter from './CurrentCommentFooter';

interface IFooterProps {
  id: string;
  request: ICurrentRequest;
  setRequest: (value: React.SetStateAction<ICurrentRequest>) => void;
  commentTimer: number;
  navigation: any;
}

const Footer = ({ id, request, setRequest, commentTimer, navigation }: IFooterProps) => {
  const [status, setStatus] = useState<number>(-1); // -1: 해설전, 0: 해설중, 1: 해설완료
  const { isAvailable, isComplete } = request;

  useEffect(() => {
    if (isAvailable && isComplete === false) setStatus(-1);
    if (isAvailable === false && isComplete === false) setStatus(0);
    if (isAvailable === false && isComplete) setStatus(1);
  }, [isAvailable, isComplete]);

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
          navigation={navigation}
        />
      )}
      {status === 1 && <AfterCommentFooter />}
    </>
  );
};

export default Footer;
