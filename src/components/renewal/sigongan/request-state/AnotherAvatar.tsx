import { Image, StyleSheet } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TESTIMGURL = require('../../../../../assets/person.png');

export const AnotherAvatar = () => {
  return <Image source={TESTIMGURL} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,

    alignSelf: 'flex-start',
    marginTop: 10,
  },
});
