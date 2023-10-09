import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useUserState } from '../../providers';
import {
  BomHeader,
  BomSwitch,
  Colors,
  Fonts,
  NextButton,
  PaddingHorizontal,
  TabBar,
  Utils,
} from '../../components/renewal';

export const MyPageScreen = () => {
  const { logout } = useUserState();

  const [isChecked, setChecked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <BomHeader text="마이페이지" isBottomBorder />

      <PaddingHorizontal value={20}>
        <ScrollView>
          <View style={styles.textWrapper}>
            <Text style={[Fonts.Bold20, Utils.fontColor(Colors.Red.Lighten100)]}>곰지님</Text>
            <Text style={[Fonts.Bold20, Utils.fontColor(Colors.Font.primary)]}>안녕하세요!</Text>
          </View>

          <View style={[styles.borderWrapper, Utils.borderColor(Colors.Red.Lighten300), { marginTop: 10 }]}>
            <View style={styles.rowWrapper}>
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>닉네임 설정</Text>

              <NextButton />
            </View>
          </View>

          <View style={[styles.borderWrapper, Utils.borderColor(Colors.Red.Lighten300), { marginTop: 20 }]}>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Red.Lighten100)]}>앱 설정</Text>

            <View style={[styles.rowWrapper, { marginTop: 10 }]}>
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>알림 설정</Text>

              <BomSwitch value={isChecked} onChangeValue={setChecked} />
            </View>
          </View>

          <View style={[styles.borderWrapper, Utils.borderColor(Colors.Red.Lighten300), { marginTop: 20 }]}>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Red.Lighten100)]}>고객 지원</Text>

            <View style={[styles.rowWrapper, { marginTop: 10 }]}>
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>1:1 문의</Text>

              <NextButton />
            </View>

            <View style={[styles.rowWrapper, { marginTop: 10 }]}>
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>사용설명서</Text>

              <NextButton />
            </View>

            <View style={[styles.rowWrapper, { marginTop: 10 }]}>
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>자주 묻는 질문(FAQ)</Text>

              <NextButton />
            </View>

            <View style={[styles.rowWrapper, { marginTop: 10 }]}>
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>개인정보처리방침</Text>

              <NextButton />
            </View>

            <View style={[styles.rowWrapper, { marginTop: 10 }]}>
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>서비스 이용약관</Text>

              <NextButton />
            </View>
          </View>

          <View style={[styles.borderWrapper, Utils.borderColor(Colors.Red.Lighten300), { marginTop: 20 }]}>
            <Pressable style={[styles.rowWrapper]} onPress={logout}>
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>로그아웃</Text>

              <NextButton />
            </Pressable>

            <View style={[styles.rowWrapper, { marginTop: 10 }]}>
              <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>회원 탈퇴</Text>

              <NextButton />
            </View>
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
