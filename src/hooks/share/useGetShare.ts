import { useEffect } from 'react';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

import { USER_STATE_KEY, getData, delay } from '../../library';

type fileType = {
  contentUri: string;
  fileName: string;
  filePath: string;
  mimeType: string;
  subject: string | null;
  text: string | null;
  weblink: string | null;
};

const imageType = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'];

export const useGetShare = () => {
  // TODO: 사진 받아서 이동

  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      async (files: fileType[]) => {
        const userState = await getData(USER_STATE_KEY);

        if (userState !== 'Sigongan') {
          // 시각 장애인 회원만 공유가 가능하다는 alert
          return;
        }

        const file = files[0];

        if (file === undefined) {
          return;
        }

        const { contentUri, filePath } = file;

        if (!imageType.reduce((acc, cur) => acc || filePath.includes(cur), false)) {
          // 사진만 공유가 된다는 alert
          return;
        }

        // android가 앱 실행이 느려서 delay를 줌
        await delay(1500);

        // success
        // contentUri를 통해 사진 받아옴
      },
      (error: unknown) => {
        error;
      },
      'com.sigongan.bomjaguk'
    );
  }, []);
};
