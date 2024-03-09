import { View, Text } from 'react-native';
import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import ContentsWrapper, { CenteredContentsWrapper } from '@/components/common/ContentsWrapper';
import Typography from '@/components/common/Typography';

export default function SigonganFaqScreen() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <PageHeader title="자주 묻는 질문" />
      <ContentsWrapper>
        <CenteredContentsWrapper>
          <Typography>질문을 터치해 답을 확인해보세요.</Typography>
        </CenteredContentsWrapper>
      </ContentsWrapper>
    </View>
  );
}
