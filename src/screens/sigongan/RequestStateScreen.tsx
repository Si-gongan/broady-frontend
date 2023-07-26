import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {
  AnotherSpeechBubble,
  MySpeechBubble,
  TimeViewer,
  AnotherAvatar,
  ActionButton,
  ThanksBox,
} from '../../components/sigongan/request-state';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SigonganStackParamList } from '../../navigations';

export const RequestStateScreen = () => {
  const {
    params: { item },
  } = useRoute<RouteProp<SigonganStackParamList, '해설 진행현황'>>();

  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 44 + insets.top - insets.bottom + 22 : 80}
    >
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.speechContainer}>
            <View style={styles.mySpeechWrapper}>
              <MySpeechBubble />
            </View>

            <View style={styles.mySpeechEndWrapper}>
              <TimeViewer />

              <MySpeechBubble />
            </View>

            <View style={styles.AnotherSpeechWrapper}>
              <AnotherAvatar />

              <AnotherSpeechBubble />

              <TimeViewer />
            </View>
          </View>
        </ScrollView>

        {/* <ActionButton
        onPress={() => {
          1;
        }}
      /> */}

        <ThanksBox />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  speechContainer: {
    flex: 1,
    gap: 12,
  },
  mySpeechWrapper: {
    marginRight: 18,
  },
  mySpeechEndWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',

    gap: 11,
    marginRight: 18,
  },
  AnotherSpeechWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',

    marginLeft: 16,
    gap: 8,
  },
});
