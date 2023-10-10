import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { BomButton, BomHeader, Colors, Fonts, PaddingHorizontal, Utils } from '../../components/renewal';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SigonganStackParamList } from '../../navigations';
import { useState } from 'react';

type IKeyType = SigonganStackParamList['사용설명서 상세']['type'];

type IINFOType = {
  [key in IKeyType]: {
    title: string;
    page: number;
    text: string[][];
  };
};

const INFO: IINFOType = {
  App: {
    title: '앱 구성',
    page: 3,
    text: [
      [
        '화면의 맨 밑에는 홈, AI 해설, 마이페이지 3개의 탭이 있습니다. 홈 탭에서는 해설자에게 사진을 질문하거나, 이전에 질문했던 사진 목록을 볼 수 있어요.',
        '홈 탭의 가장 위에는 ‘해설자에게 질문하기’ 버튼이 있어요. 해설자에게 궁금한 사진을 물어보고 채팅 형식으로 답변을 받을 수 있습니다. ',
        '‘해설자에게 질문하기’ 버튼 아래로는 질문 채팅방이 생성됩니다. 사진 한 건당 한 개의 채팅방이 개설됩니다. 내가 이전에 질문했던 사진을 확인하고, 채팅방에 들어가 해설자와 채팅을 나누며 추가 질문을 할 수 있어요. ',
      ],
      [
        'AI 해설’ 탭을 누르면, AI에게 사진을 물어볼 수 있는 채팅 화면이 나옵니다.',
        '왼쪽 하단의 사진 버튼을 통해 사진을 보내면, AI가 사진에 대한 간략한 해설을 빠르게 제공합니다.',
        '화면 아래의 채팅창을 통해 AI에게 추가 질문을 할 수 있습니다.',
      ],
      [
        '마이페이지 탭에는 앱 설정, 고객 지원, 첫 화면으로 나가기 버튼이 있습니다.',
        '‘알림 설정’ 버튼을 통해 푸시 알림을 받을지 여부를 선택할 수 있습니다.',
        '‘고객 지원’에서는 ‘1:1 문의’, ‘자주 묻는 질문(FAQ)’, ‘개인정보처리방침’, ‘서비스 이용약관’ 버튼이 있습니다. ‘1:1 문의’를 통해 봄자국을 개발한 팀 ‘시공간’에게 카카오톡 채널로 궁금한 점을 문의할 수 있습니다. 또한 ‘자주 묻는 질문’, ‘개인정보처리방침’, ‘서비스 이용약관’을 누르면 각각 설명이 정리된 페이지로 연결됩니다.',
        '지금 바로 봄자국 앱을 이용해보세요!',
      ],
    ],
  },
  Photo: {
    title: '사진 질문하기',
    page: 3,
    text: [
      [
        '대체텍스트가 없는 사진이 궁금하셨던 적 있나요? 봄자국의 ‘사진 질문하기’ 기능을 사용해보세요. 정보를 얻기 어려웠던 사진에 대해 해설자가 꼼꼼하고 친절하게 설명해드려요.',
        '홈 화면의 ‘해설자에게 사진 질문하기’ 버튼을 누르면, 사진을 선택할 수 있습니다. 직접 촬영한 사진, 갤러리에 있는 사진 모두 가능해요. 직접 촬영 버튼, 혹은 갤러리에서 선택 버튼을 눌러 궁금한 사진을 선택해주세요.',
      ],
      [
        '사진을 선택하셨다면, 질문작성 페이지로 이동합니다. 사진에 대해 궁금한 점을 입력해주세요. 질문이 구체적일수록 맞춤형 해설을 받아볼 수 있어요.',
        '사진을 바꾸고 싶다면, ‘사진 다시 선택하기’ 버튼을 눌러 사진을 바꿔보세요. 질문 작성까지 완료했다면, 아래의 ‘질문하기’ 버튼을 눌러주세요. 사진과 질문이 봄자국 해설자에게 전해집니다.',
      ],
      [
        '해설자가 질문을 확인하면, 곧바로 답변을 작성합니다. 답변이 오면 알림으로 빠르게 알려드리고 있어요.',
        '홈 화면에서 도착한 해설을 확인할 수 있어요. 더 궁금한 점이 있다면 추가 질문하기 버튼을 눌러 해설자에게 물어보세요. ',
        '답변이 만족스러웠다면 감사의 인사를 건네주세요. 해설자에게 큰 힘이 된답니다.',
      ],
    ],
  },
  Ai: {
    title: 'AI 해설',
    page: 1,
    text: [
      [
        'AI 해설 기능을 이용하여 봄자국의 AI에게 질문해보세요. 왼쪽 하단의 사진 버튼을 눌러, 궁금한 사진을 전송할 수 있습니다.',
        'AI는 ‘해당 사진이 어떤 것을 담고 있는지’ 간략하고 빠르게 해설해줍니다. 궁금한 점을 채팅으로 보내면, AI가 질문에 대한 답을 해줘요.',
        'AI는 해설을 빠르게 제공하지만, 해설이 짧고 간결해요. 해설자보다 구체적인 질문에 답하기 어려울 수 있습니다.',
      ],
    ],
  },
};

export const ManualDetailScreen = () => {
  const {
    params: { type },
  } = useRoute<RouteProp<SigonganStackParamList, '사용설명서 상세'>>();

  const data = INFO[type];
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <BomHeader text="사용설명서" isBottomBorder />

      <PaddingHorizontal value={20}>
        <View style={{ marginTop: 32 }}>
          <Text style={[Fonts.Bold24, Utils.fontColor(Colors.Font.primary)]}>{data.title}</Text>
        </View>

        <View style={{ marginTop: 21 }}>
          <Text style={[Fonts.Regular14, Utils.fontColor(Colors.Font.primary)]}>
            총 {data.page}페이지 중 {currentPage + 1}페이지
          </Text>
        </View>

        <ScrollView>
          <View style={styles.textContainer}>
            {data.text[currentPage].map((sentence, i) => (
              <Text
                key={type + String(currentPage) + i}
                style={[Fonts.Regular16, Utils.fontColor(Colors.Font.primary)]}
              >
                {sentence}
              </Text>
            ))}
          </View>

          <View style={styles.buttonsWrapper}>
            {currentPage === 0 ? (
              <View style={styles.emptyButton} />
            ) : (
              <BomButton
                text="이전"
                theme="primary"
                fixedWidth={150}
                onPress={() => setCurrentPage((prev) => prev - 1)}
              />
            )}

            {currentPage + 1 < data.page && (
              <BomButton
                text="다음"
                theme="secondary"
                fixedWidth={150}
                onPress={() => setCurrentPage((prev) => prev + 1)}
              />
            )}
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
  textContainer: {
    marginTop: 50,

    gap: 30,
  },
  buttonsWrapper: {
    marginTop: 80,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyButton: {
    width: 150,
  },
});
