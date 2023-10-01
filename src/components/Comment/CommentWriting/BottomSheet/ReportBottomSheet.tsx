import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { SigonganColor, SigonganDesign, SigonganShadow } from '../../../sigongan/styles';
import { RadioButton } from 'react-native-paper';
import { commentFont } from '../../styles';
import { Colors } from '../../../renewal';

const data = {
  image: {
    questionList: [
      { id: 0, text: '질문과 관계 없는 사진입니다.' },
      { id: 1, text: '사진을 제대로 식별할 수 없습니다.' },
      { id: 2, text: '기타' },
    ],
    title: '잘못된 사진 제보',
    text: '의뢰자에게 사진에 어떤 문제가 있는지 구체적으로 알려주세요.\n 제보 내용은 의뢰자에게 즉시 전달됩니다.',
  },
  request: {
    questionList: [
      { id: 0, text: '부적절한 사진입니다.' },
      { id: 1, text: '부적절한 질문입니다.' },
      { id: 2, text: '기타' },
    ],
    title: '부적절한 의뢰 신고',
    text: '사진 및 질문이 (선정성, 폭력성, 사기 등) 부적절하다면\n 운영진에게 알려주세요.',
  },
};

interface IReportImageBottomSheetProps {
  postId: string;
  category: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReportBottomSheet = ({ postId, category, visible, setVisible }: IReportImageBottomSheetProps) => {
  const [reportInput, setReportInput] = useState<string>('');
  const [selected, setSelected] = useState<number>(0);

  const onClose = () => setVisible(false);

  const handleClickReportImage = (postId: string) => {
    // TODO: 잘못된 사진 제보 API 연동.
  };

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View style={[styles.container, SigonganColor.backgroundPrimary]}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>{category ? data.request.title : data.image.title}</Text>
        </View>
        <View style={SigonganDesign.borderOpaque} />
        <View style={styles.itemWrapper}>
          <View style={styles.titleContainer}>
            <Text style={[commentFont.SMALL_TITLE, styles.description]}>
              {category ? data.request.text : data.image.text}
            </Text>
          </View>
          <View style={styles.questionListContainer}>
            <QuestionList category={category} selected={selected} setSelected={setSelected} />
          </View>
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
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={[commentFont.BUTTON_TEXT, styles.closeText]}>취소하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentBtn} onPress={() => handleClickReportImage(postId)}>
            <Text style={[commentFont.BUTTON_TEXT, styles.commentText]}>제보하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

interface IQuestionListProps {
  category: number;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

const QuestionList = ({ category, selected, setSelected }: IQuestionListProps) => {
  return (
    <>
      {category
        ? data.request.questionList.map((question) => (
            <View key={question.id} style={styles.questionContainer}>
              <View style={styles.radioBtnContainer}>
                <RadioButton
                  color="black"
                  value={question.text}
                  status={selected === question.id ? 'checked' : 'unchecked'}
                  onPress={() => setSelected(question.id)}
                />
              </View>
              <Text style={[commentFont.BODY1, styles.questionText]}>{question.text}</Text>
            </View>
          ))
        : data.image.questionList.map((question) => (
            <View key={question.id} style={styles.questionContainer}>
              <View style={styles.radioBtnContainer}>
                <RadioButton
                  color="black"
                  value={question.text}
                  status={selected === question.id ? 'checked' : 'unchecked'}
                  onPress={() => setSelected(question.id)}
                />
              </View>
              <Text style={[commentFont.BODY1, styles.questionText]}>{question.text}</Text>
            </View>
          ))}
    </>
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
    paddingVertical: 20,
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
  questionListContainer: {
    width: '90%',
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
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  questionText: {
    paddingLeft: 12,
    fontSize: 16,
  },
  radioBtnContainer: {
    borderWidth: 1,
    borderRadius: 20,
  },
  item: {
    alignItems: 'center',
    paddingVertical: 20,
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
  },
  closeBtn: {
    backgroundColor: 'white',
    width: '40%',
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.Red.Default,
  },
  commentBtn: {
    backgroundColor: Colors.Red.Default,
    width: '40%',
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: Colors.Red.Default,
  },
  commentText: {
    color: 'white',
  },
});

export default ReportBottomSheet;
