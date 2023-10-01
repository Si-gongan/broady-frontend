import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRecoilValue } from 'recoil';
import { getRequest, startComment } from '../../../api/axios';
import { authTokenState, fcmTokenState } from '../../../states';
import { ICurrentRequest } from '../../../types/request';
import { Colors } from '../../renewal';

interface BeforeCommentFooterProps {
  id: string;
  setRequest: (value: React.SetStateAction<ICurrentRequest>) => void;
  setStatus: (value: React.SetStateAction<number>) => void;
}

const BeforeCommentFooter = ({ id, setStatus, setRequest }: BeforeCommentFooterProps) => {
  const fcmToken = useRecoilValue(fcmTokenState);
  const authToken = useRecoilValue(authTokenState);

  const handleStartComment = async () => {
    setStatus(0);
    await startComment(id, fcmToken, authToken)
      .then((data) => {
        if (data.code === 0) {
          getRequest(id, fcmToken, authToken).then((data) => setRequest(data));
        }
      })
      .catch(() => {
        Alert.alert('통신에 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
        setStatus(-1);
      });
  };

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.commentBtn} onPress={handleStartComment}>
          <Text style={styles.commentText}>해설하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 0.15,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: Colors.Red.Default,
        shadowOffset: {
          width: 5,
          height: -5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      android: {
        elevation: 7,
      },
    }),
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  commentBtn: {
    backgroundColor: Colors.Red.Default,
    width: '90%',
    height: '80%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentEndBtn: {
    backgroundColor: 'rgba(44, 44, 44, 0.52)',
    width: '90%',
    height: '80%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentText: {
    color: 'white',
    fontSize: 22,
  },
});

export default BeforeCommentFooter;
