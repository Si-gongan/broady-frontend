import { Image, StyleSheet } from 'react-native';

type RequestImageCardProps = {
  imgUrl: string; // s3 bucket url
};

export const RequestImageCard = ({ imgUrl }: RequestImageCardProps) => {
  return <Image source={{ uri: imgUrl }} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,

    borderRadius: 13,
  },
});
