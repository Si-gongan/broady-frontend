import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Utils } from '../../styles';

type ImageViewerProps = {
  url: string;
};

export const ImageViewer = ({ url }: ImageViewerProps) => {
  return (
    <Image
      style={[styles.container, Utils.backgroundColor(Colors.None.Lighten400)]}
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
  },
});
