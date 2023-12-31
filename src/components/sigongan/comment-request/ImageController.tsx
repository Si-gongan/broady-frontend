import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SigonganColor, SigonganFont, SigonganResponsive } from '../styles';

type ImageControllerProps = {
  imgUrl: string;
  onPress?: () => void;
};

export const ImageController = ({ imgUrl, onPress }: ImageControllerProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imgUrl }} style={styles.image} accessible accessibilityLabel="방금 업로드한 이미지" />

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, SigonganColor.backgroundSecondary]}
        onPress={onPress}
        accessible
        accessibilityLabel="사진 다시 선택하기 버튼"
      >
        <Text style={[SigonganFont.teritary, SigonganColor.contentSecondary]}>사진 다시 선택하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 21,
    alignItems: 'center',
  },
  image: {
    width: SigonganResponsive.imageWidth(),
    height: 241,

    borderRadius: 13,
  },
  button: {
    width: 256,
    alignItems: 'center',

    marginTop: 27,
    marginBottom: 20,

    paddingHorizontal: 10,
    paddingVertical: 12,

    borderRadius: 8,
  },
});
