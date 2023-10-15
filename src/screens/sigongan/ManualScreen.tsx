import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { BomButton, BomHeader, Colors, Fonts, PaddingHorizontal, Utils } from '../../components/renewal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SigonganStackParamList } from '../../navigations';

export const ManualScreen = () => {
  // page move
  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <BomHeader text="사용설명서" isBottomBorder />

      <PaddingHorizontal value={20}>
        <ScrollView>
          <View
            style={{ marginTop: 42 }}
            accessible
            accessibilityLabel="안녕하세요. 사진 해설 서비스, 봄자국에 오신 것을 환영합니다"
          >
            <Text style={[Fonts.Bold28, Utils.fontColor(Colors.Font.primary)]}>안녕하세요.</Text>
            <Text style={[Fonts.Bold28, Utils.fontColor(Colors.Font.primary)]}>사진 해설 서비스,</Text>
            <Text style={[Fonts.Bold28, Utils.fontColor(Colors.Font.primary)]}>봄자국에 오신 것을 환영합니다.</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>
              애플리케이션의 화면 구성과 봄자국이 제공하는 서비스를 설명드릴게요.
            </Text>
          </View>

          <View style={{ marginTop: 30 }}>
            <BomButton
              text="앱 구성"
              theme="secondary"
              onPress={() => navigation.push('사용설명서 상세', { type: 'App' })}
              accessibilityLabel="앱 구성에 대한 설명 버튼"
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <BomButton
              text="사진 질문하기"
              theme="secondary"
              onPress={() => navigation.push('사용설명서 상세', { type: 'Photo' })}
              accessibilityLabel="사진 질문하기에 대한 설명 버튼"
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <BomButton
              text="AI 해설"
              theme="secondary"
              onPress={() => navigation.push('사용설명서 상세', { type: 'Ai' })}
              accessibilityLabel="AI 해설에 대한 설명 버튼"
            />
          </View>
        </ScrollView>
      </PaddingHorizontal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
