import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../../renewal';
import { commentFont } from '../../styles';

interface IQuestionListProps {
  questionData: { id: number; text: string }[];

  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

const QuestionList = ({ questionData, selected, setSelected }: IQuestionListProps) => {
  return (
    <View style={styles.questionListContainer}>
      {questionData.map((question) => (
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
    </View>
  );
};

const styles = StyleSheet.create({
  questionListContainer: {
    width: '90%',
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
});

export default QuestionList;
