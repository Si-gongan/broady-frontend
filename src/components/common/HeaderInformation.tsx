import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH * 0.9) / 2 - 30;

const HeaderInformation = () => {
  return (
    <>
      <View>
        <View style={styles.guideTextContainer}>
          <Text style={styles.mainText}>시각장애인의 눈이 되어주세요!👀</Text>
          <Text style={styles.guideText}>봄자국 간편 가이드❔</Text>
        </View>
        <View style={styles.requestContaier}>
          <Shadow distance={4} sides={{ top: true, bottom: true, start: true, end: true }}>
            <View style={styles.requestItemContainer}>
              <Text style={styles.textCategory}>총 질문</Text>
              <Text style={styles.requestCountText}>12건</Text>
            </View>
          </Shadow>
          <Shadow distance={4} sides={{ top: true, bottom: true, start: true, end: true }}>
            <View style={styles.requestItemContainer}>
              <Text style={styles.textCategory}>오늘의 질문</Text>
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

export default HeaderInformation;
