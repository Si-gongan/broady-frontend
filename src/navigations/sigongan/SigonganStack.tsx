import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { SigonganStackParamList } from '../../types/types';
import {
  CommentRequestScreen,
  FAQScreen,
  ManualDetailScreen,
  ManualScreen,
  PutNicknameScreen,
  RequestStateScreen,
  ShareSelectScreen,
} from '../../screens/sigongan';
import { SigonganMainTab } from './SigonganMainTab';

const Stack = createNativeStackNavigator<SigonganStackParamList>();

export const SigonganStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="메인" component={SigonganMainTab} options={{ headerShown: false }} />

      <Stack.Screen name="해설의뢰" component={CommentRequestScreen} options={{ headerShown: false }} />

      <Stack.Screen name="공유선택" component={ShareSelectScreen} options={{ headerShown: false }} />

      <Stack.Screen name="해설 진행현황" component={RequestStateScreen} options={{ headerShown: false }} />

      <Stack.Screen name="닉네임 수정" component={PutNicknameScreen} options={{ headerShown: false }} />

      <Stack.Screen name="자주 묻는 질문" component={FAQScreen} options={{ headerShown: false }} />

      <Stack.Screen name="사용설명서" component={ManualScreen} options={{ headerShown: false }} />

      <Stack.Screen name="사용설명서 상세" component={ManualDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
