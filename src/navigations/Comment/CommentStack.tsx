import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommentWritingScreen from '../screens/Comment/CommentWritingScreen';
import { CommentTab } from './CommentTab';

const Stack = createNativeStackNavigator();

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
      <Stack.Screen name="Home" options={{ headerShown: false }} component={CommentTab} />
      <Stack.Screen name="Writing" options={{ title: '해설 작성' }} component={CommentWritingScreen} />
    </Stack.Navigator>
  );
};
