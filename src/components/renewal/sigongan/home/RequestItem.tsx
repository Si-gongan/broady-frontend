import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Utils } from '../../styles';
import { getConvertDate } from '../../utils';

type IRequestItemProps = {
  imgUrl: string;

  date: string;
  chat: string;

  onPress?: () => void;
};

export const RequestItem = ({ imgUrl, date, chat, onPress }: IRequestItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}
      accessible
      accessibilityLabel={`${getConvertDate(date)} 의뢰: ${chat}`}
    >
      <Image source={{ uri: imgUrl }} style={styles.img} />

      <View style={[styles.box, Utils.borderColor(Colors.Red.Lighten300)]}>
        <Text style={[Fonts.Regular12, Utils.fontColor(Colors.Blue.Lighten100)]}>{getConvertDate(date)}</Text>

        <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>{chat}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    flexDirection: 'row',
    gap: 10,
  },
  img: {
    width: 100,
    height: 100,

    borderRadius: 12,
  },
  box: {
    flex: 1,

    borderRadius: 12,

    padding: 10,
    gap: 10,
  },
});
