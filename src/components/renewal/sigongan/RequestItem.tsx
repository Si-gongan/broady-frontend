import { View, Pressable, Image, StyleSheet, Text } from 'react-native';
import { Colors, Fonts, Utils } from '../styles';
import { getConvertDate } from '../utils';

type IRequestItemProps = {
  imgUrl: string;

  date: string;
  chat: string;
};

export const RequestItem = ({ imgUrl, date, chat }: IRequestItemProps) => {
  return (
    <Pressable style={styles.container}>
      <Image source={{ uri: imgUrl }} style={styles.img} />

      <View style={[styles.box, Utils.borderColor(Colors.Red.Lighten300)]}>
        <Text style={[Fonts.Regular12, Utils.fontColor(Colors.Blue.Lighten100)]}>{getConvertDate(date)}</Text>

        <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>{chat}</Text>
      </View>
    </Pressable>
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
