import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH * 0.9) / 2 - 30;

interface IMyRequestInformationProps {
  totalCompletedRequest: number;
  // todayCompletedRequest: number;
}

const MyRequestInformation = ({ totalCompletedRequest }: IMyRequestInformationProps) => {
  return (
    <>
      <View>
        <View style={styles.guideTextContainer}>
          <Text style={styles.mainText}>오늘도 열심히 해설해주셨군요!</Text>
        </View>
        <View style={styles.requestContaier}>
          <View style={styles.requestItemContainer}>
            <Text style={styles.textCategory}>내 누적 해설</Text>
            <Text style={styles.requestCountText}>
              {totalCompletedRequest ? totalCompletedRequest.toString().padStart(2, '0') : '00'}건
            </Text>
          </View>

          <View style={styles.requestItemContainer}>
            <Text style={styles.textCategory}>오늘 진행한 해설</Text>
            <Text style={styles.requestCountText}>
              {/* {todayCompletedRequest ? todayCompletedRequest.toString().padStart(2, '0') : '00'}건 */}
              00건
            </Text>
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

export default MyRequestInformation;
