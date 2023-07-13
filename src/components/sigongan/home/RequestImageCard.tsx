import { View, Text, Image, StyleSheet } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TESTIMGURL = require('../../../../assets/sample_request.png');

type RequestImageCardProps = {
  imgUrl: string; // s3 bucket url?
};

export const RequestImageCard = ({ imgUrl }: RequestImageCardProps) => {
  return <Image source={TESTIMGURL} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,

    borderRadius: 13,
  },
});
