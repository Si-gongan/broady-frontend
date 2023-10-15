import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { BomButton, BomHeader, Colors, Fonts, PaddingHorizontal, Utils } from '../../components/renewal';
import { useState } from 'react';

type OptionType = 'first' | 'second' | 'third';

export const FAQScreen = () => {
  const [option, setOption] = useState<OptionType>('first');

  return (
    <SafeAreaView style={styles.container}>
      <BomHeader text="자주 묻는 질문(FAQ)" isBottomBorder />

      <View style={styles.topTextWrapper}>
        <Text style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}>질문을 터치해 답을 확인해보세요.</Text>
      </View>

      <View style={styles.buttonsWrapper}>
        <BomButton
          text="앱 이용"
          onPress={() => setOption('first')}
          theme={option === 'first' ? 'secondary' : 'primary'}
          fixedWidth={100}
          accessibilityLabel={`앱 이용에 대한 FAQ 보기 ${option === 'first' ? ', 선택 됨' : ''}`}
        />

        <BomButton
          text="질문/답변"
          onPress={() => setOption('second')}
          theme={option === 'second' ? 'secondary' : 'primary'}
          fixedWidth={100}
          accessibilityLabel={`질문/답변에 대한 FAQ 보기 ${option === 'second' ? ', 선택 됨' : ''}`}
        />

        <BomButton
          text="AI 해설"
          onPress={() => setOption('third')}
          theme={option === 'third' ? 'secondary' : 'primary'}
          fixedWidth={100}
          accessibilityLabel={`AI 해설에 대한 FAQ 보기 ${option === 'third' ? ', 선택 됨' : ''}`}
        />
      </View>

      <PaddingHorizontal value={20}>
        <ScrollView>
          {option === 'first' && <Question1 />}
          {option === 'second' && <Question2 />}
          {option === 'third' && <Question3 />}
        </ScrollView>
      </PaddingHorizontal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topTextWrapper: {
    marginTop: 30,

    alignItems: 'center',
  },
  buttonsWrapper: {
    marginTop: 16,
    marginBottom: 5,

    paddingHorizontal: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginTop: 20,

    borderRadius: 12,

    paddingVertical: 15,
    paddingHorizontal: 10,

    gap: 16,
  },
});

const Question1 = () => {
  return (
    <>
      <View style={[styles.card, Utils.borderColor(Colors.Red.Lighten300)]}>
        <Text style={[Fonts.Bold16, Utils.fontColor(Colors.Font.primary)]}>봄자국 서비스를 어떻게 이용하나요?</Text>

        <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>
          봄자국은 궁금한 사진을 물어보면 AI와 사람 해설자가 답변을 제공하는 서비스이에요. 홈 화면의 해설자에게 질문하기
          버튼을 눌러 구체적인 맞춤형 해설을, AI 해설 화면을 통해 빠른 해설을 받을 수 있어요.
        </Text>
      </View>

      <View style={[styles.card, Utils.borderColor(Colors.Red.Lighten300)]}>
        <Text style={[Fonts.Bold16, Utils.fontColor(Colors.Font.primary)]}>
          사람 해설자와 AI 해설의 차이가 무엇인가요?
        </Text>

        <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>
          사람이 제공하는 해설은 기본적으로 AI보다 정교하고 정확합니다. 또한 추가적인 요청사항이 있을 경우 그에 맞추어서
          전문적인 해설을 제공해드릴 수 있어요.
        </Text>
      </View>

      <View style={[styles.card, Utils.borderColor(Colors.Red.Lighten300)]}>
        <Text style={[Fonts.Bold16, Utils.fontColor(Colors.Font.primary)]}>
          해설이 도착하면 푸시 알림을 받고 싶어요.
        </Text>

        <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>
          해설이 도착했을 때 알림을 받고 싶으시다면, 마이페이지의 알림 설정 버튼을 눌러주세요. AI와 사람 해설자의 해설
          모두 알림을 받으실 수 있습니다.
        </Text>
      </View>
    </>
  );
};

const Question2 = () => {
  return (
    <>
      <View style={[styles.card, Utils.borderColor(Colors.Red.Lighten300)]}>
        <Text style={[Fonts.Bold16, Utils.fontColor(Colors.Font.primary)]}>봄자국의 해설자는 누구인가요?</Text>

        <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>
          봄자국의 해설자는 봄자국을 만든 팀 시공간에서 직접 제작한 사진 해설 가이드라인 교육을 이수한 인력으로
          구성됩니다! 시각장애인 여러분들의 정보접근성에 관심을 가진 비장애인들이 여러분들이 궁금한 사진을 해설해드려요.
        </Text>
      </View>

      <View style={[styles.card, Utils.borderColor(Colors.Red.Lighten300)]}>
        <Text style={[Fonts.Bold16, Utils.fontColor(Colors.Font.primary)]}>어떤 종류의 사진이든 해설해주시나요?</Text>

        <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>
          법적으로 문제가 되지 않는 한 대부분의 사진을 해설해드릴 수 있어요. 하지만, 과도하게 성적이거나 폭력적인 내용을
          담은 사진, 타인의 민감한 개인정보가 포함된 사진 등 규정에 위배되는 사진은 검토 후 반환조치될 수 있어요.
        </Text>
      </View>

      <View style={[styles.card, Utils.borderColor(Colors.Red.Lighten300)]}>
        <Text style={[Fonts.Bold16, Utils.fontColor(Colors.Font.primary)]}>
          사람 해설자가 해설해주는 데 시간은 얼마나 걸리나요?
        </Text>

        <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>
          사람 해설자는 봄자국의 교육을 거친 인력으로, 봄자국의 사람 해설 서비스는 해설자들이 자발적으로 사진을 선택하여
          이루어집니다. 해설 답변이 오는 데 다소 시간이 걸리더라도 너른 양해 부탁드립니다.
        </Text>
      </View>

      <View style={[styles.card, Utils.borderColor(Colors.Red.Lighten300)]}>
        <Text style={[Fonts.Bold16, Utils.fontColor(Colors.Font.primary)]}>
          해설자에게 잘못된/ 부당한 답변을 받았어요.
        </Text>

        <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>
          원하는 정보를 전부 제공하지 않는 해설의 경우, 추가 질문을 통해 더 구체적으로 물어볼 수 있어요. 그럼에도 오류가
          있는 해설이나 계속 불만족스러운 해설을 받는다면, 해설을 꾹 눌러 ‘신고하기’ 버튼을 통해 해설을 신고해주세요.
          욕설이나 폭력성, 선정성이 포함된 해설 등 부적절한 해설을 받았을 시, 봄자국 운영진에게 신고해주세요. 부적절한
          해설을 꾹 누르면 신고할 수 있습니다.
        </Text>
      </View>
    </>
  );
};

const Question3 = () => {
  return (
    <>
      <View style={[styles.card, Utils.borderColor(Colors.Red.Lighten300)]}>
        <Text style={[Fonts.Bold16, Utils.fontColor(Colors.Font.primary)]}>AI는 어떤 설명을 제공하나요?</Text>

        <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>
          AI는 전송한 사진에 대한 전체적이고 간략한 해설을 제공할 수 있습니다. 궁금한 점을 추가로 짧게 덧붙이면, 질문에
          대한 답을 제공할 수 있어요.
        </Text>
      </View>

      <View style={[styles.card, Utils.borderColor(Colors.Red.Lighten300)]}>
        <Text style={[Fonts.Bold16, Utils.fontColor(Colors.Font.primary)]}>AI가 원하는 정보를 주지 않아요.</Text>

        <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>
          봄자국 AI는 최선의 정보를 제공하기 위해 노력하고 있어요. 그럼에도 아직 AI는 똑똑해지는 중이어서, 완벽한 정보를
          제공하지 못할 수도 있습니다. AI를 통해 충분한 정보를 얻지 못하셨다면, 사람 해설자에게 사진을 질문해보시는 건
          어떨까요?
        </Text>
      </View>
    </>
  );
};
