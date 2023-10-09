import { Image, StyleSheet } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TESTIMGURL = require('../../../../../assets/robot.png');

export const RobotAvatar = () => {
  return <Image source={TESTIMGURL} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    borderRadius: 18,

    alignSelf: 'flex-end',
  },
});
