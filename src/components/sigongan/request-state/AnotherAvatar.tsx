import { View, Image, StyleSheet } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TESTIMGURL = require('../../../../assets/sample_request.png');

export const AnotherAvatar = () => {
  return <Image source={TESTIMGURL} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    borderRadius: 36,

    alignSelf: 'flex-end',
    marginBottom: 3,
  },
});
