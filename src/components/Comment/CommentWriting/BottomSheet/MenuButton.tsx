import { StyleSheet } from 'react-native';
import { TouchableOpacity, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { commentFont } from '../../styles';

interface IMenuButtonProps {
  content: string;
  handleClick: () => void;
}

const MenuButton = ({ content, handleClick }: IMenuButtonProps) => {
  return (
    <TouchableOpacity style={styles.item} onPress={handleClick}>
      <View style={styles.touchContainer}>
        <Text style={commentFont.BODY1}>{content}</Text>
        <MaterialIcons name="arrow-forward-ios" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  touchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
});

export default MenuButton;
