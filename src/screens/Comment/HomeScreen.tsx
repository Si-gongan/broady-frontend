import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, Image, Button, Modal, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getRequestAll } from '../../api/axios';
import RequestList from '../../components/Comment/Home/RequestList';
import { authTokenState, fcmTokenState } from '../../states';
import { IRequest } from '../../types/request';
import Carousel from 'react-native-snap-carousel';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [currentRequest, setCurrentRequest] = useState<IRequest[]>([]);
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const isFocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isFocused) {
      // 모든 의뢰목록 가져오기
      getRequestAll(fcmToken, authToken).then((data) => {
        const sortedRequestList = [...data].sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1));
        setCurrentRequest(sortedRequestList);
      });
    }
  }, [isFocused]);

  return (
    <>
      <Modal
          visible={modalVisible}
          presentationStyle='formSheet'
          animationType='slide'
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{marginHorizontal:30, marginVertical:60, justifyContent: 'center'}}>
            <Carousel
              layout={'default'}
              data={[1,2,3]}
              renderItem={({item, index})=>{
                return (<View style={{backgroundColor:'red'}}>
                  <Image
                    style={{width:320, height:400, resizeMode: 'contain'}}
                    source={require('../../../assets/sample_comment.png')}
                  />
                </View>);
              }}
              sliderWidth={320}
              itemWidth={320}
            />
          </View>
        </Modal>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>의뢰목록</Text>
        {/*<View style={styles.button}>
          <Button 
            title="해설 가이드"
            onPress={()=>{
              setModalVisible(true);
            }}
          />
          </View>*/}
      </View>
      <View style={styles.bodyContainer}>
        <RequestList requestList={currentRequest} navigation={navigation} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 23,
    marginBottom: 10,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    height: 45,
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 3,
    flexDirection: 'row',
    flexWrap: 'wrap'
    
  },
  mainTitle: {
    fontSize: 24,
    paddingLeft: 35,
  },
  button: {
    paddingRight: 10,
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 30,
  }
});

export default HomeScreen;
