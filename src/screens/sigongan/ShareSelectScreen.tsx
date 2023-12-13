import { SafeAreaView, StyleSheet, View } from 'react-native';
import { BomButton, BomHeader, PaddingHorizontal } from '../../components/renewal';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SigonganMainTabParamList, SigonganStackParamList } from '../../navigations';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const ShareSelectScreen = () => {
  // for page move
  /** @param url: 이미지 로컬 url */
  const {
    params: { url },
  } = useRoute<RouteProp<SigonganStackParamList, '공유선택'>>();
  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList & SigonganMainTabParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <BomHeader text="봄자국에서 사진 질문하기" isBottomBorder />

      <PaddingHorizontal value={20}>
        <View style={styles.buttonWrapper}>
          <BomButton
            text="AI에게 사진 질문하기"
            theme="primary"
            onPress={() => navigation.navigate('AI 해설', { url })}
          />

          <BomButton
            text="해설자에게 사진 질문하기"
            theme="secondary"
            onPress={() => navigation.navigate('해설의뢰', { url })}
          />
        </View>
      </PaddingHorizontal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    gap: 20,
  },
});
