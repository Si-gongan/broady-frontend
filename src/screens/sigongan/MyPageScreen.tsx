import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useUserState } from '../../providers';
import {
  AlarmSetting,
  BomHeader,
  Colors,
  Fonts,
  NextButton,
  ONE_TO_ONE_QUESTION,
  PRIVACY_POLICY,
  PaddingHorizontal,
  TERMS_OF_USE,
  TabBar,
  Utils,
} from '../../components/renewal';
import { useRecoilValue } from 'recoil';
import { nicknameState } from '../../states';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SigonganStackParamList } from '../../navigations';

import * as WebBrowser from 'expo-web-browser';

export const MyPageScreen = () => {
  // page move
  const navigation = useNavigation<NativeStackNavigationProp<SigonganStackParamList>>();

  const { logout } = useUserState();

  const nickname = useRecoilValue(nicknameState);

  return (
    <SafeAreaView style={styles.container}>
      <BomHeader text="마이페이지" isBottomBorder />

      <PaddingHorizontal value={20}>
        <ScrollView>
          <View style={styles.textWrapper}>
            <Text style={[Fonts.Bold20, Utils.fontColor(Colors.Red.Lighten100)]}>{nickname}님</Text>
            <Text style={[Fonts.Bold20, Utils.fontColor(Colors.Font.primary)]}>안녕하세요!</Text>
          </View>

          <View style={[styles.borderWrapper, Utils.borderColor(Colors.Red.Lighten300), { marginTop: 10 }]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.rowWrapper}
              onPress={() => navigation.push('닉네임 수정')}
              accessible
              accessibilityLabel="닉네임 수정 버튼"
              hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
            >
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>닉네임 설정</Text>

              <NextButton />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20 }}>
            <AlarmSetting />
          </View>

          <View style={[styles.borderWrapper, Utils.borderColor(Colors.Red.Lighten300), { marginTop: 20 }]}>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Red.Lighten100)]}>고객 지원</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.rowWrapper, { marginTop: 10 }]}
              onPress={() => WebBrowser.openBrowserAsync(ONE_TO_ONE_QUESTION)}
              accessible
              accessibilityLabel="1:1 문의 버튼"
              hitSlop={{ right: 15, left: 15 }}
            >
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>1:1 문의</Text>

              <NextButton />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.rowWrapper, { marginTop: 10 }]}
              onPress={() => navigation.push('사용설명서')}
              accessible
              accessibilityLabel="사용설명서 버튼"
              hitSlop={{ right: 15, left: 15 }}
            >
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>사용설명서</Text>

              <NextButton />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.rowWrapper, { marginTop: 10 }]}
              onPress={() => navigation.push('자주 묻는 질문')}
              accessible
              accessibilityLabel="자주 묻는 질문 버튼"
              hitSlop={{ right: 15, left: 15 }}
            >
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>자주 묻는 질문(FAQ)</Text>

              <NextButton />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.rowWrapper, { marginTop: 10 }]}
              onPress={() => WebBrowser.openBrowserAsync(PRIVACY_POLICY)}
              accessible
              accessibilityLabel="개인정보처리방침 버튼"
              hitSlop={{ right: 15, left: 15 }}
            >
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>개인정보처리방침</Text>

              <NextButton />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.rowWrapper, { marginTop: 10 }]}
              onPress={() => WebBrowser.openBrowserAsync(TERMS_OF_USE)}
              accessible
              accessibilityLabel="서비스 이용약관 버튼"
              hitSlop={{ right: 15, left: 15 }}
            >
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>서비스 이용약관</Text>

              <NextButton />
            </TouchableOpacity>
          </View>

          <View style={[styles.borderWrapper, Utils.borderColor(Colors.Red.Lighten300), { marginTop: 20 }]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.rowWrapper]}
              onPress={logout}
              accessible
              accessibilityLabel="로그아웃 버튼"
              hitSlop={{ right: 15, left: 15 }}
            >
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>로그아웃</Text>

              <NextButton />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </PaddingHorizontal>

      <TabBar currentIndex={2} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textWrapper: {
    marginTop: 40,

    flexDirection: 'row',
    alignItems: 'center',

    gap: 5,
  },
  borderWrapper: {
    borderRadius: 12,

    padding: 20,
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
});
