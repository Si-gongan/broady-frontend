import { ScrollView, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { getDateText, getYYMMDDHHMM } from '../../utils/time';
import { BomHeader, Fonts, Utils, Colors } from '../../components/renewal';

const AnnounceScreen = ({ route }: any) => {
  const {
    announceType,
    type,
    reportedAt,
    reason,
  }: { announceType: 'notice' | 'report'; type?: string; reportedAt?: Date; reason?: string } = route.params.announce;

  if (announceType === 'notice') {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <BomHeader text="공지사항 상세" isBottomBorder />

        <View style={{ display: 'flex', gap: 10, marginTop: 35 }}>
          <View style={[styles.textWrapper]}>
            <Text style={[Fonts.Bold20, Utils.fontColor(Colors.Font.primary)]}>해설자 서비스 중단 안내</Text>
          </View>

          <View style={styles.textWrapper}>
            <Text style={[Fonts.Bold16, Utils.fontColor(Colors.Font.primary)]}>
              봄자국 해설자 서비스 중단 : 2024.03.20 ~
            </Text>
          </View>

          <View style={[styles.textWrapper, { marginTop: 15 }]}>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>
              안녕하세요, 봄자국 운영진입니다!
            </Text>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>
              늘 좋은 해설로 시각장애인의 눈이 되어 주셔서
            </Text>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>진심으로 감사드립니다.</Text>
          </View>

          <View style={[styles.textWrapper, { marginTop: 10 }]}>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>
              저희는 더 나은 서비스를 준비하기 위해,
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={[Fonts.Bold14, Utils.fontColor(Colors.None.Darken400)]}>해설자 서비스를 잠시 중단</Text>
              <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>하려고 합니다.</Text>
            </View>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>
              많은 관심과 애정을 주신 여러분께
            </Text>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>
              갑작스런 내용으로 공지드려 죄송합니다.
            </Text>
          </View>

          <View style={[styles.textWrapper, { marginTop: 10 }]}>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>
              포인트는 2024.03.20까지 환급 신청하실 수 있으며,
            </Text>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>
              이후로는 서비스 재개 후 신청하실 수 있습니다.
            </Text>
          </View>

          <View style={[styles.textWrapper, { marginTop: 10 }]}>
            <Text style={[Fonts.Bold14, Utils.fontColor(Colors.None.Darken400)]}>
              4월 중으로 더 개선된 서비스와 함께
            </Text>
            <Text style={[Fonts.Bold14, Utils.fontColor(Colors.None.Darken400)]}>다시 찾아 뵙도록 하겠습니다.</Text>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>
              새로워질 봄자국에 기대와 응원 부탁드립니다. :{')'}
            </Text>
          </View>

          <View style={[styles.textWrapper, { marginTop: 10 }]}>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>
              알림 ON 해주시면 서비스 재개 시
            </Text>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>
              빠르게 소식 전해 드리도록 하겠습니다!
            </Text>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>
              그 외 소식은 인스타그램 @sigongan_official에서
            </Text>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>확인하실 수 있습니다.</Text>
          </View>

          <View style={[styles.textWrapper, { marginTop: 10 }]}>
            <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.secondary)]}>팀 봄자국 드림</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BomHeader text="공지사항 상세" isBottomBorder />

      <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 1, marginTop: 25 }}>
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>{type}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{getYYMMDDHHMM(new Date(reportedAt ?? ''))}</Text>
        </View>
        <View style={{ width: '90%' }}>
          <Text style={{ fontSize: 16 }}>
            {getDateText(new Date(reportedAt ?? ''))}에 제공한 해설에 대해 아래와 같은 운영정책 위반 사항이
            확인되었습니다.
            {'\n\n'}해설 내용 : 세 마리의 고양이가 나란히 밥그릇의 사료를 먹고 있는 모습을 위에서 촬영한 사진입니다.
            {'\n\n'}위반 사유 : {reason}
            {'\n\n'}서비스 운영정책 위반으로 서비스 이용이 다음과 같이 제한됩니다.
            {'\n\n'}이용제한 : 경고 2회
            {'\n\n'}문의사항이 있을 경우, 1:1 문의를 이용해주세요.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainTextContainer: {
    width: '90%',
    paddingVertical: 20,
  },
  dateContainer: {
    gap: 10,
    width: '90%',
    paddingBottom: 20,
  },
  mainText: {
    fontSize: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#4B4B4B',
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
});

export default AnnounceScreen;
