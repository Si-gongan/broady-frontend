import { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { SigonganColor, SigonganDesign, SigonganShadow } from '../../sigongan/styles';
import { commentFont } from '../../Comment/styles';
import { Colors } from '../../renewal';
import QuestionList from './QuestionList';
import ReportButton from './ReportButton';
import { reportImage, reportRequest } from '../../../api/axios';
import { useRecoilValue } from 'recoil';
import { authTokenState, fcmTokenState } from '../../../states';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IData {
  [key: string]: {
    questionList: { id: number; text: string; checked: boolean }[];
    title: string;
    text: string;
    buttonText: string;
  };
}

const questionData: IData = {
  image: {
    questionList: [
      { id: 0, text: '질문과 관계 없는 사진입니다.', checked: false },
      { id: 1, text: '사진을 제대로 식별할 수 없습니다.', checked: false },
      { id: 2, text: '기타', checked: false },
    ],
    title: '잘못된 사진 제보',
    text: '의뢰자에게 사진에 어떤 문제가 있는지 구체적으로 알려주세요.\n 제보 내용은 의뢰자에게 즉시 전달됩니다.',
    buttonText: '제보하기',
  },
  request: {
    questionList: [
      { id: 0, text: '부적절한 사진입니다.', checked: false },
      { id: 1, text: '부적절한 질문입니다.', checked: false },
      { id: 2, text: '기타', checked: false },
    ],
    title: '부적절한 의뢰 신고',
    text: '사진 및 질문이 (선정성, 폭력성, 사기 등) 부적절하다면\n 운영진에게 알려주세요.',
    buttonText: '신고하기',
  },
};

interface IReportImageBottomSheetProps {
  postId: string;
  category: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReportBottomSheet = ({ postId, category, visible, setVisible }: IReportImageBottomSheetProps) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);
  const navigation = useNavigation();

  const [reportInput, setReportInput] = useState('');
  const [selectedText, setSelectedText] = useState('');

  const [selectQuestion, setSelectQuestion] = useState(questionData[category].questionList);
  const [type, setType] = useState<string>('부적절한 사진');

  const insets = useSafeAreaInsets();

  const showToastMessage = (message: string, position: string) => {
    Toast.show(message, {
      duration: 1000,
      animation: true,
      position:
        position === 'CENTER' ? Toast.positions.CENTER : Platform.OS === 'ios' ? insets.top : Toast.positions.TOP,
    });
  };

  const onClose = () => setVisible(false);

  const handleReportImage = async () => {
    try {
      await reportImage(postId, type, selectedText, fcmToken, authToken);
      navigation.goBack();
      showToastMessage('제보가 완료되었습니다.', 'TOP');
    } catch (err) {
      console.log('REPORT IMAGE ERROR:', err);
    }
  };

  const handleReportRequest = async () => {
    try {
      // TODO: 부적절한 의뢰 신고하기
      // await reportRequest();
      navigation.goBack();
      showToastMessage('신고가 완료되었습니다.', 'TOP');
    } catch (err) {
      console.log('REPORT REQUEST ERROR:', err);
    }
  };

  const handleSelect = (id: number) => {
    const selected = selectQuestion.filter((question) => question.id === id);
    setSelectedText(selected[0].text);

    setSelectQuestion(
      selectQuestion.map((question) =>
        question.id === id ? { ...question, checked: true } : { ...question, checked: false }
      )
    );
  };

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View style={[styles.container, SigonganColor.backgroundPrimary]}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>{questionData[category].title}</Text>
        </View>
        <View style={SigonganDesign.borderOpaque} />
        <View style={styles.itemWrapper}>
          <View style={styles.titleContainer}>
            <Text style={[commentFont.SMALL_TITLE, styles.description]}>{questionData[category].text}</Text>
          </View>
          <QuestionList questionData={selectQuestion} handleSelect={handleSelect} />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputLengthContainer}>
            <Text style={commentFont.BODY2}>{reportInput.length} / 100</Text>
          </View>
          <View style={styles.textContainer}>
            <TextInput
              placeholder="제보할 내용을 작성해주세요"
              multiline
              onChangeText={(text) => setReportInput(text)}
              value={reportInput}
              textAlignVertical="top"
              style={styles.inputBox}
              autoComplete="off"
            />
          </View>
        </View>
        <View style={styles.footerContainer}>
          <ReportButton content="취소하기" type={0} handleClick={onClose} />
          <ReportButton
            content={questionData[category].buttonText}
            type={1}
            handleClick={category === 'image' ? handleReportImage : handleReportRequest}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    ...SigonganShadow.shadowTopHigh,
  },
  titleWrapper: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 18,
  },
  itemWrapper: {
    paddingTop: 20,
    alignItems: 'center',
  },
  titleContainer: {
    width: '90%',
    paddingVertical: 10,
  },
  description: {
    color: '#767676',
    textAlign: 'center',
  },
  inputLengthContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  textContainer: {
    alignItems: 'center',
  },
  inputBox: {
    marginTop: 5,
    paddingLeft: 10,
    paddingTop: 15,
    height: 80,
    width: '90%',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.Red.Default,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 30,
  },
});

export default ReportBottomSheet;
