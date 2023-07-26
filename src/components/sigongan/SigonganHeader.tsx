import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SigonganDesign, SigonganFont } from './styles';

type SigonganHeaderProps = {
  onBackButtonPress: () => void;
  text: string;
  isBottomBorder?: boolean;
};

export const SigonganHeader = ({ text, isBottomBorder, onBackButtonPress }: SigonganHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View>
      <View style={[styles.container, { marginTop: insets.top }]}>
        <TouchableOpacity activeOpacity={0.8} onPress={onBackButtonPress}>
          <Ionicons name="arrow-back" style={styles.icon} />
        </TouchableOpacity>

        <Text style={SigonganFont.primary}>{text}</Text>

        <Ionicons name="arrow-back" style={styles.icon2} />
      </View>

      {isBottomBorder && <View style={SigonganDesign.borderOpaque} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingTop: 10,
    paddingBottom: 30,
  },
  icon: {
    marginLeft: 31,
    fontSize: 30,
  },
  icon2: {
    marginRight: 31,
    fontSize: 30,
    opacity: 0,
  },
});
