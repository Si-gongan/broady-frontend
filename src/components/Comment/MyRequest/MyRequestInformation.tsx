import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH * 0.9) / 2 - 30;

const MyRequestInformation = () => {
  return (
    <>
      <View>
        <View style={styles.guideTextContainer}>
          <Text style={styles.mainText}>오늘도 열심히 해설해주셨군요!</Text>
        </View>
        <View style={styles.requestContaier}>
          <Shadow distance={4} sides={{ top: true, bottom: true, start: true, end: true }}>
            <View style={styles.requestItemContainer}>
              <Text style={styles.textCategory}>내 누적 해설</Text>
              <Text style={styles.requestCountText}>12건</Text>
            </View>
          </Shadow>
          <Shadow distance={4} sides={{ top: true, bottom: true, start: true, end: true }}>
            <View style={styles.requestItemContainer}>
              <Text style={styles.textCategory}>오늘 진행한 해설</Text>
              <Text style={styles.requestCountText}>03건</Text>
            </View>
          </Shadow>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  guideTextContainer: {
    gap: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  mainText: {
    fontWeight: '700',
  },
  guideText: {
    fontSize: 12,
  },
  requestContaier: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'center',
    margin: 20,
  },
  requestItemContainer: {
    width: ITEM_WIDTH,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCategory: {
    fontSize: 10,
  },
  requestCountText: {
    fontSize: 14,
  },
});

export default MyRequestInformation;
