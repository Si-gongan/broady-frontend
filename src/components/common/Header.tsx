import { View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export const Header = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text onPress={navigation.goBack}>뒤로가기</Text>

      <Text>Header</Text>
    </View>
  );
};
