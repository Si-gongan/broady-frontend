import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const StartScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={styles.text}>이메일로 계속하기</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={styles.text}>카카오톡으로 계속하기</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={styles.text}>애플로 계속하기</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={styles.text}>구글로 계속하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    gap: 14,
  },
  button: {
    backgroundColor: '#000',

    width: 343,
    borderRadius: 8,

    alignItems: 'center',
  },
  text: {
    color: '#fff',
    paddingVertical: 16,

    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});
