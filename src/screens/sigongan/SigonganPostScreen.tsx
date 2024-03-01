import { registerPostApi } from '@/axios';
import BroadyButton from '@/components/common/BroadyButton';
import BroadyTextInput from '@/components/common/BroadyTextInput';
import FlexBox from '@/components/common/FlexBox';
import Icons from '@/components/common/Icons';
import Margin from '@/components/common/Margin';
import PageHeader from '@/components/common/PageHeader';
import Typography from '@/components/common/Typography';
import ChatItem from '@/components/sigongan/ChatItem';
import ChatList from '@/components/sigongan/ChatList';
import ChatSendModal from '@/components/sigongan/ChatSendModal';
import ImagePickerModal from '@/components/sigongan/ImagePickerModal';
import { useModal } from '@/hooks/useModal';
import { usePostLists } from '@/hooks/usePostLists';
import { SigonganStackParamList } from '@/navigations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import Modal from 'react-native-modal';
import { set } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';

const ImageBox = styled.View`
  aspect-ratio: 1;
  /* padding-bottom: 100%; */
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.STYLES.RADIUS.md}px;
  background-color: ${({ theme }) => theme.COLOR.GRAY_50};
`;

const MainContents = styled.ScrollView`
  padding-bottom: ${({ theme }) => theme.SPACING.MARGIN.h2}px;
`;

const PostWrapper = styled.View`
  padding-left: ${({ theme }) => theme.SPACING.MARGIN.h2}px;
  padding-right: ${({ theme }) => theme.SPACING.MARGIN.h2}px;
`;

const InputBox = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.SPACING.PADDING.P5 + 2}px ${({ theme }) => theme.SPACING.PADDING.P3}px
    ${({ theme }) => theme.SPACING.PADDING.P5}px;
  background-color: ${({ theme }) => theme.COLOR.WHITE};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.COLOR.BD_5};
`;

const ICON_SOURCE = {
  SEND: require('@/../assets/images/send_icon.png'),
  SEND_FILL: require('@/../assets/images/send_fill.png'),
};

type Props = NativeStackScreenProps<SigonganStackParamList, 'Post'>;

export default function SigonganPostScreen({ route, navigation }: Props) {
  const url = route.params?.url;

  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const {
    selectedPost,
    currentRoomState: { isBlocked, isComplete, isPaused, isPinned },
  } = usePostLists();

  const [input, setInput] = React.useState('');
  const [sendLoading, setSendLoading] = React.useState(false);
  const [hasSendFirstRequest, setHasSendFirstRequest] = React.useState(false);
  const [chatList, setChatList] = React.useState(selectedPost?.chat || []);

  const scrollViewRef = React.useRef<ScrollView>(null);

  const isNewRoom = selectedPost ? false : hasSendFirstRequest ? false : true;

  const { isModalVisible, openModal: openImagePickerModal, setIsModalVisible } = useModal();
  const { isModalVisible: isSendModalVisible, openModal: openSendModal, closeModal: closeSendModal } = useModal();

  const imageSource = input ? ICON_SOURCE.SEND_FILL : ICON_SOURCE.SEND;

  // 문제는 방이 없을때는. chatList가 없다. 그렇다면? chatLIst를 따로 뺀다.

  const onPressSendIcon = () => {
    if (input) {
      openSendModal();
    }
  };

  const onPressSendToComment = async () => {
    // api 요청을 보낸다. 그리고 성공하면, 해당 텍스트를 렌더링한다.

    setHasSendFirstRequest(true);
    setSendLoading(true);
    closeSendModal();

    try {
      let form = new FormData();
      let deletedPostId = isPaused ? selectedPost?.id : undefined;

      const response = await registerPostApi(input, form, deletedPostId);

      setChatList((prev) => {
        return [
          ...prev,
          {
            id: '1',
            text: input,
            email: '',
            isReported: false,
            reason: '',
            type: 'sigongan',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      });

      scrollViewRef.current?.scrollToEnd({ animated: true });

      setSendLoading(false);
      setInput('');
    } catch (e) {
      setHasSendFirstRequest(false);
    }
  };

  const onPressSendToAI = async () => {
    // api 요청을 보낸다. 그리고 성공하면, 해당 텍스트를 렌더링한다.

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setHasSendFirstRequest(true);
      setSendLoading(false);
    } catch (e) {}
  };

  const onPressConnectToCustomerService = () => {
    // 고객센터 연결하기
  };

  const onPressSelectPhotoAgain = () => {
    // 사진 다시 선택하기
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <PageHeader title="시공간" headerRight={<Icons type="materialIcons" name="menu" size={30}></Icons>} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <MainContents
          ref={scrollViewRef}
          onContentSizeChange={() => {
            // 여기다가 어떤 경우에 스크롤을 하면 될지에 대한 조건문을 추가하면 된다.
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
        >
          <PostWrapper>
            <FlexBox direction="column" alignItems="center" gap={20}>
              <ImageBox>
                <Image
                  resizeMode="cover"
                  source={{ uri: url }}
                  style={{
                    aspectRatio: 1,
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: 12,
                  }}
                />
              </ImageBox>
              {isNewRoom && (
                <BroadyButton onPress={openImagePickerModal} variant="secondary" text="사진 다시 선택하기" />
              )}
            </FlexBox>
            <Margin margin={20} />
            <ChatList chatList={chatList} />
            {sendLoading && (
              <>
                <Margin margin={30} />
                <ActivityIndicator size="large" />
              </>
            )}
          </PostWrapper>
          <Margin margin={20} />
        </MainContents>
        {isBlocked ? (
          <PostWrapper>
            <BroadyButton variant="primary" text="고객센터 연결하기" onPress={onPressConnectToCustomerService} />
          </PostWrapper>
        ) : isPaused ? (
          <PostWrapper>
            <BroadyButton variant="primary" text="사진 다시 선택하기" onPress={onPressSelectPhotoAgain} />
          </PostWrapper>
        ) : (
          <InputBox>
            <FlexBox direction="row" alignItems="center" gap={10}>
              <BroadyTextInput
                placeholder="내용을 입력해주세요"
                variant="Border"
                paddingVariant="small"
                borderColor={theme.COLOR.BD_5}
                text={input}
                onChangeText={setInput}
                initialType="text"
              />
              <Pressable onPress={onPressSendIcon}>
                <Image source={imageSource} style={{ width: 30, height: 30 }} />
              </Pressable>
            </FlexBox>
          </InputBox>
        )}
      </KeyboardAvoidingView>
      <Margin margin={bottom} />
      <ImagePickerModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
      <ChatSendModal
        onPressSendToComment={onPressSendToComment}
        onPressSendToAI={onPressSendToAI}
        isSendModalVisible={isSendModalVisible}
        closeSendModal={closeSendModal}
        input={input}
        setInput={setInput}
      />
    </View>
  );
}
