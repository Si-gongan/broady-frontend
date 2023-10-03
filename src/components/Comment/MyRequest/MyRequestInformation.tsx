import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '../../renewal';
import { commentFont } from '../styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH * 0.9) / 2 - 30;

interface IMyRequestInformationProps {
  totalCompletedRequest: number;
  // todayCompletedRequest: number;
}

const MyRequestInformation = ({ totalCompletedRequest }: IMyRequestInformationProps) => {
  return (
    
      <View style={styles.mainContainer}>
        <View style={styles.guideTextContainer}>
          <Text style={[styles.mainText, commentFont.SLOGAN]}>오늘도 열심히{'\n'}해설해주셨군요!</Text>
        </View>
        <View style={styles.requestContaier}>
          <View style={styles.requestItemContainer}>
            <Text style={[commentFont.SMALL_TITLE, styles.textCategory]}>내 누적 해설</Text>
            <Text style={commentFont.TITLE}>
              {totalCompletedRequest ? totalCompletedRequest.toString().padStart(2, '0') : '00'}건
            </Text>
          </View>

          <View style={styles.requestItemContainer}>
            <Text style={[commentFont.SMALL_TITLE, styles.textCategory]}>오늘 진행한 해설</Text>
            <Text style={commentFont.TITLE}>
              {/* {todayCompletedRequest ? todayCompletedRequest.toString().padStart(2, '0') : '00'}건 */}
              00건
            </Text>
          </View>
        </View>
      </View>
    
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
  },
  guideTextContainer: {
    // marginVertical: 15,
    marginLeft: 35,
    // alignItems: 'center',
  },
  mainText: {
    lineHeight: 40,
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
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Red.Lighten300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  textCategory: {
    color: '#565656',
  },
  requestCountText: {
    fontSize: 14,
  },
});

export default MyRequestInformation;
