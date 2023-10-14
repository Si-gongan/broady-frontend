import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRecoilValue } from 'recoil';
import { authTokenState, nicknameState } from '../../../states';
import { getData, NICKNAME } from '../../common/async-storage';
import { Colors } from '../../renewal';
import { commentFont } from '../styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH * 0.9) / 2 - 30;

interface HomeInformationProps {
  navigation: any;
  totalRequestCount: number;
  todayRequestCount: number;
}

const HomeInformation = ({ navigation, totalRequestCount, todayRequestCount }: HomeInformationProps) => {
  const token = useRecoilValue(authTokenState);
  const nickname = getData(NICKNAME);

  const handleMoveOnboarding = () => {
    navigation.navigate('간편 가이드');
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.guideTextContainer}>
        <Text style={[styles.mainText, commentFont.SLOGAN]}>시각장애인의{'\n'}눈이 되어주세요!👀</Text>
      </View>
      <View style={styles.requestContainer}>
        <View style={styles.requestItemContainer}>
          <Text style={[commentFont.SMALL_TITLE, styles.textCategory]}>총 질문</Text>
          <Text style={commentFont.TITLE}>{totalRequestCount.toString().padStart(2, '0')}건</Text>
        </View>

        <View style={styles.requestItemContainer}>
          <Text style={[commentFont.SMALL_TITLE, styles.textCategory]}>오늘의 질문</Text>
          <Text style={commentFont.TITLE}>{todayRequestCount.toString().padStart(2, '0')}건</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.guideContainer} onPress={handleMoveOnboarding}>
        <Text style={[commentFont.SMALL_TITLE, styles.guideText]}>봄자국 간편 가이드</Text>
        <Icon name="help-circle-outline" size={15}></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
  },
  guideTextContainer: {
    marginLeft: 35,
  },
  mainText: {
    lineHeight: 40,
  },
  guideText: {
    color: '#565656',
  },
  guideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
  },
  requestContainer: {
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

export default HomeInformation;
