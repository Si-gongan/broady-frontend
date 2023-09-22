import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AnnounceContentScreen from '../../screens/Comment/AnnounceContentScreen';
import AnnounceScreen from '../../screens/Comment/AnnounceScreen';

const Stack = createNativeStackNavigator();

export const AnnounceStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="AnnounceMain" options={{ headerShown: false }} component={AnnounceScreen} />
      <Stack.Screen name="AnnounceContent" options={{ headerShown: false }} component={AnnounceContentScreen} />
    </Stack.Navigator>
  );
};
