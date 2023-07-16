import { View, Text, StyleSheet } from 'react-native';
import { SigonganColor, SigonganFont } from '../styles';

export const TimeViewer = () => {
  return (
    <View style={styles.container}>
      <Text style={[SigonganFont.quaternary, SigonganColor.contentQuinary]}>오후 2:05</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
  },
});
