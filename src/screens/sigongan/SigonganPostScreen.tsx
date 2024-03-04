import { addAditionalRequestApi, changePinStatusApi, registerPostApi } from '@/axios';
import BroadyButton from '@/components/common/BroadyButton';
import BroadyTextInput from '@/components/common/BroadyTextInput';
import FlexBox from '@/components/common/FlexBox';
import Icons from '@/components/common/Icons';
import Margin from '@/components/common/Margin';
import PageHeader from '@/components/common/PageHeader';
import Typography from '@/components/common/Typography';
import ChatList from '@/components/sigongan/ChatList';
import ChatSendModal from '@/components/sigongan/ChatSendModal';
import ImagePickerModal from '@/components/sigongan/ImagePickerModal';
import PostMenuModal from '@/components/sigongan/PostMenuModal';
import { GET_MARGIN } from '@/constants/theme';
import { useModal } from '@/hooks/useModal';
import { usePostLists } from '@/hooks/usePostLists';
import { SigonganStackParamList } from '@/navigations';
import { authTokenState } from '@/states';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import styled, { useTheme } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import PostSummaryModal from '@/components/sigongan/PostSummaryModal';
import { logError } from '@/library/axios';
import { showCheckToast } from '@/library/toast/toast';
import { from } from 'form-data';

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
  padding: ${({ theme }) => theme.SPACING.PADDING.P5 + 2}px ${({ theme }) => theme.SPACING.PADDING.P3}px
    ${({ theme }) => theme.SPACING.PADDING.P5}px;
  background-color: ${({ theme }) => theme.COLOR.WHITE};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.COLOR.BD_5};
`;

const InputBoxMock = styled.View`
  padding: ${({ theme }) => theme.SPACING.PADDING.P5 + 2}px ${({ theme }) => theme.SPACING.PADDING.P3}px
    ${({ theme }) => theme.SPACING.PADDING.P5}px;
  background-color: ${({ theme }) => theme.COLOR.WHITE};
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLOR.BD_5};
  border-radius: ${({ theme }) => theme.STYLES.RADIUS.md}px;
`;

const PinButton = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.SPACING.PADDING.P6}px ${({ theme }) => theme.SPACING.PADDING.P4}px;
  border-radius: ${({ theme }) => theme.STYLES.RADIUS.md + 5}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLOR.BD_6};
`;

const SummaryBox = styled.Pressable`
  position: absolute;
  top: 20px;
  z-index: 10;
  align-self: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLOR.WHITE};
  border-radius: ${({ theme }) => theme.STYLES.RADIUS.lg}px;
`;

const SummaryInnerBox = styled.View`
  padding: ${({ theme }) => theme.SPACING.PADDING.P6}px ${({ theme }) => theme.SPACING.PADDING.P4}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const AISummaryIcon = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const ICON_SOURCE = {
  SEND: require('@/../assets/images/send_icon.png'),
  SEND_FILL: require('@/../assets/images/send_fill.png'),
};

type Props = NativeStackScreenProps<SigonganStackParamList, 'Post'>;

export default function SigonganPostScreen({ route, navigation }: Props) {
  const localUploadUrl = route.params?.assets?.uri;
  const fromDeletedPostId = route.params?.fromDeletedPostId;

  useEffect(() => {
    return () => {
      if (deletedPostId.current) {
        deletedPostId.current = undefined;
      }
    };
  }, []);

  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const {
    selectedPost,
    getInitialPostList,
    setSelectedPostId,
    updateSelectedPost,
    setSyncPostList,
    currentRoomState: { isBlocked, isComplete, isPaused, isPinned },
  } = usePostLists();

  const token = useRecoilValue(authTokenState);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const { isModalVisible: isImagePickerModalVisible, openModal: openImagePickerModal, setIsModalVisible } = useModal();
  const { isModalVisible: isSendModalVisible, openModal: openSendModal, closeModal: closeSendModal } = useModal();
  const { isModalVisible: isMenuModalVisible, openModal: openMenuModal, closeModal: closeMenuModal } = useModal();
  const {
    isModalVisible: isSummaryModalVisible,
    openModal: openSummaryModal,
    closeModal: closeSummaryModal,
  } = useModal();

  const deletedPostId = useRef<string | undefined>(undefined);
  const [input, setInput] = React.useState('');
  const [sendLoading, setSendLoading] = React.useState(false);

  const chatList = selectedPost?.chat || [];
  const imageUrl = selectedPost ? process.env.EXPO_PUBLIC_S3_BUCKET_URL + '/' + selectedPost?.photo : localUploadUrl;

  const isWaitingForResponse = selectedPost ? !isComplete && selectedPost.chat.length > 0 : false;
  const showSelectImageAgain = selectedPost ? false : true;
  const showPinnedButton = selectedPost ? (!isPinned && isComplete ? true : false) : false;
  const showSummaryButton = selectedPost ? (isComplete ? true : false) : false;

  const sendIcon = input ? ICON_SOURCE.SEND_FILL : ICON_SOURCE.SEND;

  const onPressSendIcon = () => {
    if (input) {
      openSendModal();
    }
  };

  const onPressMenuIcon = () => {
    openMenuModal();
  };

  const onPressSendToComment = async () => {
    setSendLoading(true);
    closeSendModal();

    if (!isComplete) {
      try {
        if (!localUploadUrl) throw new Error('localUploadUrl is not defined');

        const response = await registerPostApi(input, localUploadUrl, fromDeletedPostId, token);

        await getInitialPostList();
        setSelectedPostId(response.data.result.post.id);

        scrollViewRef.current?.scrollToEnd({ animated: true });

        setSendLoading(false);
        setInput('');
      } catch (e) {
        logError(e);
      }
    }
    // 이 경우에는 추가질문이다.
    else if (isComplete && selectedPost?.id) {
      try {
        const response = await addAditionalRequestApi(selectedPost?.id, input, token);

        setSyncPostList((prev) => {
          return prev.map((post) => {
            if (post.id === selectedPost?.id) {
              return response.data.result.post;
            }
            return post;
          });
        });

        scrollViewRef.current?.scrollToEnd({ animated: true });

        setSendLoading(false);
        setInput('');
      } catch (e) {
        logError(e);
      }
    }
  };

  const onPressSendToAI = async () => {
    // api 요청을 보낸다. 그리고 성공하면, 해당 텍스트를 렌더링한다.

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSendLoading(false);
    } catch (e) {}
  };

  // 이거는 신고먹었을때.
  const onPressConnectToCustomerService = () => {
    // 고객센터 연결하기
  };

  const onPressSelectPhotoAgain = () => {
    // 사진 다시 선택하기
    // 이 deletedPostId를 imagePicker에게 넘겨줘야함.

    deletedPostId.current = selectedPost?.id;

    openImagePickerModal();
  };

  const onPressPinButton = async () => {
    if (selectedPost?.id) {
      try {
        const response = await changePinStatusApi(selectedPost?.id, true, token);
        updateSelectedPost('isPinned', true);

        showCheckToast(
          '찜한 해설에 저장되었어요!',
          <Pressable onPress={onPressPinCancleButton}>
            <Typography size="body_lg" weight="semibold" color={theme.COLOR.WHITE}>
              취소
            </Typography>
          </Pressable>
        );
      } catch (e) {
        logError(e);
      }
    }
  };

  const onPressPinCancleButton = async () => {
    if (selectedPost?.id) {
      try {
        const response = await changePinStatusApi(selectedPost?.id, false, token);
        updateSelectedPost('isPinned', false);

        showCheckToast('찜한 해설에서 삭제되었어요!', null);
      } catch (e) {
        logError(e);
      }
    }
  };

  const onPressSummaryButton = () => {
    // 해설 전체 요약하기
    openSummaryModal();
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <PageHeader
        title="시공간"
        headerRight={<Icons type="materialIcons" name="menu" size={30} onPress={onPressMenuIcon}></Icons>}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        {showSummaryButton && (
          <SummaryBox onPress={onPressSummaryButton}>
            <SummaryInnerBox>
              <LinearGradient
                colors={['#FFFFFF00', '#389F9F']}
                style={{
                  borderRadius: 20,
                }}
              >
                <AISummaryIcon>
                  <Typography size="body_md" weight="semibold" color={theme.COLOR.FONT.CONTENT}>
                    Ai
                  </Typography>
                </AISummaryIcon>
              </LinearGradient>
              <Typography size="body_md" weight="semibold" color={theme.COLOR.FONT.CONTENT}>
                해설 전체 요약하기
              </Typography>
            </SummaryInnerBox>
          </SummaryBox>
        )}
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
                  source={{ uri: imageUrl }}
                  style={{
                    aspectRatio: 1,
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: 12,
                  }}
                />
              </ImageBox>
              {showSelectImageAgain && (
                <BroadyButton onPress={openImagePickerModal} variant="grey" text="사진 다시 선택하기" />
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
            {showPinnedButton && (
              <>
                <FlexBox>
                  <PinButton onPress={onPressPinButton}>
                    <Typography size="body_md" weight="semibold" color={theme.COLOR.FONT.SUB_CONTENTDIM}>
                      해설 찜하기
                    </Typography>
                  </PinButton>
                </FlexBox>
                <Margin margin={GET_MARGIN('h4') + 5} />
              </>
            )}
            <FlexBox direction="row" alignItems="center" gap={10}>
              {!isWaitingForResponse ? (
                <>
                  <View style={{ flex: 1 }}>
                    <BroadyTextInput
                      placeholder="내용을 입력해주세요"
                      variant="Border"
                      paddingVariant="small"
                      borderColor={theme.COLOR.BD_5}
                      text={input}
                      onChangeText={setInput}
                      initialType="text"
                    />
                  </View>
                  <Pressable onPress={onPressSendIcon}>
                    <Image source={sendIcon} style={{ width: 30, height: 30 }} />
                  </Pressable>
                </>
              ) : (
                <>
                  <View style={{ flex: 1 }}>
                    <InputBoxMock>
                      <Typography size="body_md" color={theme.COLOR.FONT.SUB_CONTENT}>
                        답변을 기다리고 있어요.
                      </Typography>
                    </InputBoxMock>
                  </View>
                  <Image source={ICON_SOURCE.SEND} style={{ width: 30, height: 30 }} />
                </>
              )}
            </FlexBox>
          </InputBox>
        )}
      </KeyboardAvoidingView>
      <Margin margin={bottom} />
      <ImagePickerModal
        deletedPostId={deletedPostId.current}
        isVisible={isImagePickerModalVisible}
        setIsVisible={setIsModalVisible}
      />
      <ChatSendModal
        onPressSendToComment={onPressSendToComment}
        onPressSendToAI={onPressSendToAI}
        isSendModalVisible={isSendModalVisible}
        closeSendModal={closeSendModal}
        input={input}
        setInput={setInput}
      />
      <PostMenuModal isVisible={isMenuModalVisible} setIsVisible={closeMenuModal} />
      <PostSummaryModal isVisible={isSummaryModalVisible} setIsVisible={closeSummaryModal} />
    </View>
  );
}
