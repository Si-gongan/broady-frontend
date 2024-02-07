import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../renewal';
import { commentFont } from '../../../Comment/styles';

interface IReportButtonProps {
  content: string;
  type: number;
  handleClick: () => void;
}

const ReportButton = ({ content, type, handleClick }: IReportButtonProps) => {
  return (
    <TouchableOpacity style={type ? styles.commentBtn : styles.closeBtn} onPress={handleClick}>
      <Text style={[commentFont.BUTTON_TEXT, type ? styles.commentText : styles.closeText]}>{content}</Text>
    </TouchableOpacity>
  );
};

const buttonStyle = StyleSheet.create({
  report: {
    width: '42%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
  },
});

const styles = StyleSheet.create({
  closeBtn: {
    ...buttonStyle.report,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.Red.Default,
  },
  commentBtn: {
    ...buttonStyle.report,
    backgroundColor: Colors.Red.Default,
  },
  closeText: {
    color: Colors.Red.Default,
  },
  commentText: {
    color: 'white',
  },
});

export default ReportButton;
