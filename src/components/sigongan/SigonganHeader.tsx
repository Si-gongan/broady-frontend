import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SigonganDesign, SigonganFont } from './styles';

type SigonganHeaderProps = {
  onBackButtonPress?: () => void;
  text: string;
  isBottomBorder?: boolean;

  hideBackButton?: boolean;
};

export const SigonganHeader = ({ hideBackButton, text, isBottomBorder, onBackButtonPress }: SigonganHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View>
      <View style={[styles.container, { marginTop: insets.top }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onBackButtonPress}
          style={{ opacity: hideBackButton ? 0 : 1 }}
          accessible
          accessibilityLabel="뒤로가기 버튼"
          disabled={hideBackButton}
        >
          <Ionicons name="arrow-back" style={styles.icon} />
        </TouchableOpacity>

        <Text style={SigonganFont.primary}>{text}</Text>

        <Ionicons name="arrow-back" style={styles.icon2} accessible={false} />
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
    paddingBottom: 25,
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
