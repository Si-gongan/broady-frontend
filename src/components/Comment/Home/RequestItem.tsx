import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Platform } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { IRequest } from '../../../types/request';
import { getConvertDate } from '../../../utils/time';
import { SigonganShadow } from '../../sigongan/styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH * 0.9) / 2 - 30; // 부모컴포넌트 width:90%에 2개씩 렌더링. gap: 30
const RequestItem = ({ request, navigation }: { request: IRequest; navigation: any }) => {
  const gapTime = getConvertDate(request.createdAt);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Writing', {
          id: request.id,
        })
      }
    >
      <View style={styles.cardContainer}>
        <View style={styles.image}>
          <ImageBackground
            source={{ uri: `${process.env.EXPO_PUBLIC_AWS_BUCKET_BASE_URL}/${request.photo}` }}
            style={{ width: '100%', height: '100%' }}
            imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            resizeMode="stretch"
            blurRadius={10} //Blur 효과
          />
        </View>
        <View style={styles.imageTextContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.createdAtRequest}>{gapTime}</Text>
          </View>
          <Text style={styles.requestContent}>{request.text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loadingImage: {
    display: 'none',
  },
  loadingSpinner: {
    height: 118,
    display: 'flex',
    justifyContent: 'center',
  },
  cardContainer: {
    height: 200,
    width: ITEM_WIDTH,
    display: 'flex',
    borderRadius: 12,
    // overflow: 'hidden',
    gap: 10,
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      android: {
        elevation: 7,
      },
    }),
  },
  image: {
    width: '100%',
    height: '70%',
  },
  imageTextContainer: {
    flex: 1,
    marginHorizontal: 10,
    gap: 10,
  },
  createdAtRequest: {
    fontSize: 12,
    color: 'gray',
  },
  requestContent: {},
});

export default RequestItem;
