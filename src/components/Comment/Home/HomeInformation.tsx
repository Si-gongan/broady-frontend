import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH * 0.9) / 2 - 30;

interface HomeInformationProps {
  totalRequestCount: number;
  todayRequestCount: number;
}

const HomeInformation = ({ totalRequestCount, todayRequestCount }: HomeInformationProps) => {
  return (
    <>
      <View>
        <View style={styles.guideTextContainer}>
          <Text style={styles.mainText}>시각장애인의 눈이 되어주세요!👀</Text>
          <Text style={styles.guideText}>봄자국 간편 가이드❔</Text>
        </View>
        <View style={styles.requestContaier}>
          <View style={styles.requestItemContainer}>
            <Text style={styles.textCategory}>총 질문</Text>
            <Text style={styles.requestCountText}>{totalRequestCount.toString().padStart(2, '0')}건</Text>
          </View>

          <View style={styles.requestItemContainer}>
            <Text style={styles.textCategory}>오늘의 질문</Text>
            <Text style={styles.requestCountText}>{todayRequestCount.toString().padStart(2, '0')}건</Text>
          </View>
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
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      android: {
        elevation: 7,
      },
    }),
  },
  textCategory: {
    fontSize: 10,
  },
  requestCountText: {
    fontSize: 14,
  },
});

export default HomeInformation;
