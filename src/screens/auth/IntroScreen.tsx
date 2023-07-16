import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export const IntroScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={require('../../../assets/intro-icon.png')} style={styles.image} />
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.button1}>
        <Text style={styles.text}>시각지원이 필요해요</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} style={styles.button2}>
        <Text style={styles.text}>해설자로 활동할게요</Text>
      </TouchableOpacity>
    </View>
  );
};

const commonStyles = StyleSheet.create({
  button: {
    width: 343,
    borderRadius: 10,
    paddingVertical: 38,

    alignItems: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 100,
  },
  button1: {
    ...commonStyles.button,
    backgroundColor: '#1634B2',

    marginBottom: 22,
  },
  button2: {
    ...commonStyles.button,
    backgroundColor: '#00145E',

    marginBottom: 75,
  },
  text: {
    color: '#fff',

    fontSize: 26,
    fontStyle: 'italic',
    fontWeight: '400',
  },
});
