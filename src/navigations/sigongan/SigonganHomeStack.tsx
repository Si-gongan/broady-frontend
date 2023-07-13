import { View, Text } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { SigonganHomeStackParamList } from '../../types/types';
import { HomeScreen } from '../../screens/sigongan';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

const Stack = createNativeStackNavigator<SigonganHomeStackParamList>();

export const SigonganHomeStack = () => {
  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    navigation.setOptions({
      tabBarStyle: { display: routeName === '해설의뢰' ? 'none' : 'flex' },
    });
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen
        name="홈-홈"
        component={HomeScreen}
        options={{
          title: '홈',
        }}
      />

      <Stack.Screen name="해설의뢰" component={Example} />
    </Stack.Navigator>
  );
};

const Example = () => {
  return (
    <View>
      <Text>해설의뢰 페이지</Text>
    </View>
  );
};
