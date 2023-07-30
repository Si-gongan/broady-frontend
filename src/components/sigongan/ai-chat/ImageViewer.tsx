import { View, Text, StyleSheet, Image } from 'react-native';
import { SigonganColor, SigonganShadow } from '../styles';

type ImageViewerProps = {
  url: string;
};

export const ImageViewer = ({ url }: ImageViewerProps) => {
  return (
    <Image
      style={[styles.container, SigonganColor.backgroundPrimary]}
      source={{
        uri: url,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 201,
    height: 146,

    borderRadius: 13,

    ...SigonganShadow.shadowBottomLow,
  },
});
