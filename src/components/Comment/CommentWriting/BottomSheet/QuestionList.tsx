import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../../renewal';
import { commentFont } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';

interface IQuestionListProps {
  questionData: { id: number; text: string; checked: boolean }[];
  handleSelect: (id: number) => void;
}

const QuestionList = ({ questionData, handleSelect }: IQuestionListProps) => {
  return (
    <View style={styles.questionListContainer}>
      {questionData.map((question) => (
        <TouchableOpacity key={question.id} style={styles.questionContainer} onPress={() => handleSelect(question.id)}>
          {question.checked ? (
            <Icon name="checkbox" size={25} color={Colors.Red.Default}></Icon>
          ) : (
            <Icon name="square-outline" size={25}></Icon>
          )}
          <Text style={[commentFont.BODY1, styles.questionText]}>{question.text}</Text>
        </TouchableOpacity>
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
});

export default QuestionList;
