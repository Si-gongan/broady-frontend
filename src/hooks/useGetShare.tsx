import { useEffect } from 'react';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import { USER_STATE, getData } from '../components/common/async-storage';
import { Notice, delay } from '../components/renewal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SigonganStackParamList } from '../navigations';
import { Platform } from 'react-native';

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
  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();

  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      async (files: fileType[]) => {
        const userState = await getData(USER_STATE);

        if (userState !== 'Sigongan') {
          Notice('시각장애인 회원만 사진 공유가 가능합니다.');
          return;
        }

        const file = files[0];
        console.log('file', file);

        if (file === undefined) {
          return;
        }

        const { contentUri, filePath } = file;

        if (!imageType.reduce((acc, cur) => acc || filePath.includes(cur), false)) {
          return;
        }

        await delay(1500);

        navigation.navigate('해설의뢰', { url: Platform.OS === 'ios' ? filePath : contentUri });
      },
      (error: any) => {
        1;
      },
      'com.sigongan.bomjaguk'
    );
  }, []);
};
