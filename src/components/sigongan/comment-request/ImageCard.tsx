import { View, Text, Image, StyleSheet } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TESTIMGURL = require('../../../../assets/sample_request.png');

type ImageCardProps = {
  imgUrl: string; // s3 bucket url?
};

export const ImageCard = ({ imgUrl }: ImageCardProps) => {
  return <Image source={TESTIMGURL} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: 338,
    height: 241,

    borderRadius: 13,

    marginTop: 21,
  },
});
