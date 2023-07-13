import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SigonganColor, SigonganFont } from '../styles';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TESTIMGURL = require('../../../../assets/sample_request.png');

type ImageControllerProps = {
  imgUrl: string; // s3 bucket url?
  onPress: () => void;
};

export const ImageController = ({ imgUrl, onPress }: ImageControllerProps) => {
  return (
    <View style={styles.container}>
      <Image source={TESTIMGURL} style={styles.image} />

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, SigonganColor.backgroundSecondary]}
        onPress={onPress}
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
    width: 338,
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
