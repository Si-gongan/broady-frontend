import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useUserState } from '../../providers';
import { BomHeader, Colors, Fonts, NextButton, PaddingHorizontal, TabBar, Utils } from '../../components/renewal';

export const MyPageScreen = () => {
  const { logout } = useUserState();

  return (
    <SafeAreaView style={styles.container}>
      <BomHeader text="마이페이지" isBottomBorder />

      <PaddingHorizontal value={20}>
        <View style={[styles.nicknameWrapper, Utils.borderColor(Colors.Red.Lighten300)]}>
          <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>닉네임 설정</Text>

          <NextButton />
        </View>
      </PaddingHorizontal>

      <TabBar currentIndex={2} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nicknameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    borderRadius: 12,

    padding: 20,
  },
});
