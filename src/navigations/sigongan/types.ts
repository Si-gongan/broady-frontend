import { SCREENS } from '@/constants/screens';
import { ImagePickerAsset } from 'expo-image-picker';

export type SigonganTabParamList = {
  [SCREENS.MAINSTACK.MAINTAB.브로디홈]: undefined;
  [SCREENS.MAINSTACK.MAINTAB.찜한해설]: undefined;
  [SCREENS.MAINSTACK.MAINTAB.브로디마이페이지]: undefined;
};

export type SigonganStackParamList = {
  [SCREENS.MAINSTACK.브로디메인탭]: undefined;
  [SCREENS.MAINSTACK.브로디대화방]: {
    assets?: ImagePickerAsset;
    fromDeletedPostId?: string;
  };
  [SCREENS.MAINSTACK.브로디닉네임설정]: undefined;
  [SCREENS.MAINSTACK.브로디자주묻는질문]: undefined;
};
