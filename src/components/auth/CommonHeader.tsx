import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthDesign } from './styles';

type CommonHeaderProps = {
  text: string;
  onBackButtonPress: () => void;
};

export const CommonHeader = ({ text, onBackButtonPress }: CommonHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onBackButtonPress}>
        <Ionicons name="arrow-back" style={styles.icon} />
      </TouchableOpacity>

      <Text style={[AuthDesign.headerFont, styles.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  icon: {
    fontSize: 30,
    padding: 14,
    marginLeft: 15,
  },
  text: {
    marginLeft: 28,
  },
});
