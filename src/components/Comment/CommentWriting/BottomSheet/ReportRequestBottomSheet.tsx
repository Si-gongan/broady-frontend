import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { SigonganColor, SigonganDesign, SigonganShadow } from '../../../sigongan/styles';
import { RadioButton } from 'react-native-paper';

interface IReportRequestBottomSheetProps {
  postId: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const selectList = [
  { id: 0, text: '부적절한 사진입니다.' },
  { id: 1, text: '부적절한 질문입니다.' },
  { id: 2, text: '기타' },
];

const ReportRequestBottomSheet = ({ postId, visible, setVisible }: IReportRequestBottomSheetProps) => {
  const [reportInput, setReportInput] = useState<string>('');
  const [selected, setSelected] = useState<number>(0);

  const handleReportInput = (text: string) => {
    setReportInput(text);
  };

  const onClose = () => setVisible(false);

  const handleClickReportRequest = (postId: string) => {
    // TODO: 부적절한 의뢰 신고 API 연동.
  };

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View style={[styles.container, SigonganColor.backgroundPrimary]}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>부적절한 의뢰 신고</Text>
        </View>
        <View style={SigonganDesign.borderOpaque} />
        <View style={styles.itemWrapper}>
          <View style={{ width: '90%' }}>
            {selectList.map((question) => (
              <View key={question.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                <View style={{ borderWidth: 1, borderRadius: 20 }}>
                  <RadioButton
                    color="black"
                    value={question.text}
                    status={selected === question.id ? 'checked' : 'unchecked'}
                    onPress={() => setSelected(question.id)}
                  />
                </View>
                <Text style={{ paddingLeft: 12, fontSize: 16 }}>{question.text}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ marginBottom: 15 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
            <Text>신고 내용</Text>
            <Text>{reportInput.length} / 100</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              placeholder="신고할 내용을 작성해주세요"
              multiline
              onChangeText={(text) => handleReportInput(text)}
              value={reportInput}
              textAlignVertical="top"
              style={styles.inputBox}
              autoComplete="off"
            />
          </View>
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.commentBtn} onPress={onClose}>
            <Text style={styles.commentText}>취소하기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.commentBtn} onPress={() => handleClickReportRequest(postId)}>
            <Text style={styles.commentText}>신고하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    paddingTop: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    ...SigonganShadow.shadowTopHigh,
  },
  titleWrapper: {
    // width: '100%',
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
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'black',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  commentBtn: {
    backgroundColor: '#2C2C2C',
    width: '42%',
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ReportRequestBottomSheet;
