import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CommentTab } from './CommentTab';
import type { CommentStackParamList } from './types';
import { SCREENS } from '@/constants/screens';
import CommentPostScreen from '@/screens/comment/CommentPostScreen';
import { CommentNicknameSettingScreen } from '@/screens/comment/CommentNicknameSettingScreen';
import { CommentSettingScreen } from '@/screens/comment/CommentSettingScreen';
import { CommentAlarmSettingScreen } from '@/screens/comment/CommentAlarmSettingScreen';
import { CommentDonationScreen } from '@/screens/comment/CommentDonationScreen';
import { CommentRefundScreen } from '@/screens/comment/CommentRefundScreen';

const Stack = createNativeStackNavigator<CommentStackParamList>();

export const CommentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name={SCREENS.COMMENTSTACK.해설자메인탭} component={CommentTab} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.COMMENTSTACK.해설자대화방} component={CommentPostScreen} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.COMMENTSTACK.해설자닉네임설정} component={CommentNicknameSettingScreen} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.COMMENTSTACK.해설자설정} component={CommentSettingScreen} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.COMMENTSTACK.해설자알림설정} component={CommentAlarmSettingScreen} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.COMMENTSTACK.해설자기부} component={CommentDonationScreen} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.COMMENTSTACK.해설자환급} component={CommentRefundScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
