import {
  SendTarget,
  addAditionalRequestApi,
  changePinStatusApi,
  getPostListApi,
  registerPostApi,
  reportCommentApi,
  summaryPostApi,
} from '@/axios';
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
import PostChatReportModal from '@/components/sigongan/PostChatReportModal';
import PostMenuModal from '@/components/sigongan/PostMenuModal';
import PostReportCompleteModal from '@/components/sigongan/PostReportCompleteModal';
import PostSummaryModal from '@/components/sigongan/PostSummaryModal';
import { GET_MARGIN } from '@/constants/theme';
import { useModal } from '@/hooks/useModal';
import { usePostLists } from '@/hooks/usePostLists';
import { delay } from '@/library';
import { logError } from '@/library/axios';
import { showCheckToast, showErrorToast } from '@/library/toast/toast';
import { SigonganStackParamList } from '@/navigations';
import { authTokenState, selectedPostIdAtom, syncPostListAtom } from '@/states';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  AccessibilityInfo,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import styled, { useTheme } from 'styled-components/native';
import { Shadow } from 'react-native-shadow-2';
import Share from 'react-native-share';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { set } from 'react-native-reanimated';

const ImageBox = styled.View`
  aspect-ratio: 1;
  /* padding-bottom: 100%; */
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.STYLES.RADIUS.md}px;
  background-color: ${({ theme }) => theme.COLOR.GRAY_50};
`;

const MainContents = styled.ScrollView<{
  ref: React.RefObject<any>;
}>`
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

// fromDeletedPostId는, 메시지 보낼때 실제로 지울 이전의 post id.
// deletedPostId는, 이미지 다시 선택했을때 그걸 등록해서, imagePickerModal에게 보내주려고.

export default function SigonganPostScreen({ route, navigation }: Props) {
  const localUploadUrl = route.params?.assets?.uri;
  const fromDeletedPostId = route.params?.fromDeletedPostId;

  useEffect(() => {
    if (fromDeletedPostId) {
      deletedPostId.current = fromDeletedPostId;
    }

    return () => {
      if (deletedPostId.current) {
        deletedPostId.current = undefined;
      }
      if (selectedReportChatId.current) {
        selectedReportChatId.current = undefined;
      }
    };
  }, []);

  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();

  // 근데 문제는... 이렇게 하면, pinned에는 있는데 postList에는 없는걸 참조할 위험이 있따.
  // 그러면 atom 자체를 postScreen으로 넘겨준다??

  const {
    selectedPost,
    selectedPostId,
    getInitialPostList,
    setSelectedPostId,
    updateSelectedPost,
    setSyncPostList,
    currentRoomState: { isBlocked, isComplete, isPaused, isPinned },
  } = usePostLists({
    postListFetcher: getPostListApi,
    postListAtom: syncPostListAtom,
    selectedPostIdAtom: selectedPostIdAtom,
  });

  console.log('selectedPost', selectedPost?.id);

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
  const { isModalVisible: isReportModalVisible, openModal: openReportModal, closeModal: closeReportModal } = useModal();
  const {
    isModalVisible: isReportCompleteModalVisible,
    openModal: openReportCompleteModal,
    closeModal: closeReportCompleteModal,
  } = useModal();

  // 이거는 이미지를 다시 선택했을때, 기존의 post id를 등록하기 위함.

  const deletedPostId = useRef<string | undefined>(undefined);
  const [input, setInput] = React.useState('');
  const [sendLoading, setSendLoading] = React.useState(false);
  const [summary, setSummary] = React.useState('');
  const [summaryLoading, setSummaryLoading] = React.useState(false);

  const selectedReportChatId = useRef<string | undefined>(undefined);

  const chatList = selectedPost?.chat || [];
  const imageUrl = selectedPost ? process.env.EXPO_PUBLIC_S3_BUCKET_URL + '/' + selectedPost?.photo : localUploadUrl;

  const [hasSendFirstRequest, setHasSendFirstRequest] = React.useState(
    selectedPost ? selectedPost.chat.length > 0 : false
  );

  const isWaitingForResponse = selectedPost ? !isComplete && selectedPost.chat.length > 0 : hasSendFirstRequest;
  const showSelectImageAgain = selectedPost ? false : !hasSendFirstRequest;
  const showPinnedButton = selectedPost ? (!isPinned && isComplete ? true : false) : false;
  const showSummaryButton = selectedPost ? selectedPost.chat.length >= 2 : false;
  const pageTitle = selectedPost ? selectedPost.title : hasSendFirstRequest ? '시공간' : '사진 선택';

  const sendIcon = input ? ICON_SOURCE.SEND_FILL : ICON_SOURCE.SEND;

  // FIXME 전송을 눌렀을때, 바로 사진이 안보이고 기다리고 있어요 라고 되어야 하는데.

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(input);
  }, [input]);

  const onPressSendIcon = () => {
    if (input) {
      openSendModal();
    }
  };

  const onPressMenuIcon = () => {
    openMenuModal();
  };

  const afterSendMessage = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
    AccessibilityInfo.announceForAccessibility('질문을 성공적으로 전송했습니다.');
    setSendLoading(false);
  };

  const sharePicture = async () => {
    let result = '[Broady]';

    if (showSummaryButton) {
      if (summary) {
        result += '\n';
        result += summary;
      } else {
        try {
          if (!selectedPost?.id) throw new Error('selectedPostId is not defined');

          const response = await summaryPostApi(selectedPost?.id, token);

          result += '\n';
          result += response.data.result.summary;
        } catch (e) {
          logError(e);
          showErrorToast('요약을 불러오는데 실패했어요.');
        }
      }
    }

    try {
      if (!imageUrl) throw new Error('imageUrl is not defined');

      const res = await ReactNativeBlobUtil.fetch('GET', imageUrl);

      const status = res.info().status;

      if (status !== 200) {
        throw new Error('이미지를 불러오는데 실패했습니다.');
      }

      const base64Str = res.base64();
      const options = {
        message: result,
        url: `data:image/jpeg;base64,${base64Str}`,
      };

      Share.open(options);
    } catch (e) {
      logError(e);

      showErrorToast('공유에 실패했어요.');
    } finally {
      // changeLoading(false);
    }
  };

  const addAdditionalRequest = async (target: SendTarget, message: string) => {
    if (!selectedPost?.id) return;

    try {
      const response = await addAditionalRequestApi(target, selectedPost?.id, message, token);

      setSyncPostList((prev) => {
        return prev.map((post) => {
          if (post.id === selectedPost?.id) {
            return response.data.result.post;
          }
          return post;
        });
      });

      afterSendMessage();
    } catch (e) {
      logError(e);
    }
  };

  const onPressSendRequest = async (target: SendTarget) => {
    setSendLoading(true);
    setInput('');
    closeSendModal();
    updateSelectedPost('isComplete', false);

    if (target === 'ai') {
      updateSelectedPost('chat', [
        ...chatList,
        {
          id: 'temp' + Date.now(),
          text: input,
          time: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          type: 'sigongan',
        },
      ]);
    }

    if (!isComplete) {
      setHasSendFirstRequest(true);

      try {
        if (!localUploadUrl) throw new Error('localUploadUrl is not defined');

        const response = await registerPostApi(input, localUploadUrl, fromDeletedPostId, target, token);

        await getInitialPostList();
        setSelectedPostId(response.data.result.post.id);

        afterSendMessage();
      } catch (e) {
        logError(e);

        setSendLoading(false);

        showErrorToast('질문을 전송하는데 실패했어요. 다시 시도해주세요.');

        AccessibilityInfo.announceForAccessibility('질문을 전송하는데 실패했어요. 다시 시도해주세요.');
      }
    }
    // 이 경우에는 추가질문이다.
    else if (isComplete && selectedPost?.id) {
      addAdditionalRequest(target, input);
    }
  };
  // 이거는 신고먹었을때.
  const onPressConnectToCustomerService = () => {};

  const onPressSelectPhotoAgain = () => {
    // 두가지 상황.

    if (selectedPost?.id) {
      deletedPostId.current = selectedPost?.id;
    }

    openImagePickerModal();
  };

  const onPressCommentChat = (id: string) => {
    selectedReportChatId.current = id;
    openReportModal();
  };

  const onPressPinButton = async () => {
    if (selectedPost?.id && !isPinned) {
      try {
        await changePinStatusApi(selectedPost?.id, true, token);
        updateSelectedPost('isPinned', true);
        AccessibilityInfo.announceForAccessibility('찜한 해설에 저장되었어요!');
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
    } else {
      AccessibilityInfo.announceForAccessibility('이미 찜한 해설입니다.');
      showErrorToast('이미 찜한 해설입니다.');
    }
  };

  const onPressPinCancleButton = async () => {
    if (selectedPost?.id) {
      try {
        await changePinStatusApi(selectedPost?.id, false, token);
        updateSelectedPost('isPinned', false);

        showCheckToast('찜한 해설에서 삭제되었어요!', null);
      } catch (e) {
        logError(e);
      }
    }
  };

  const onPressSummaryButton = async () => {
    openSummaryModal();

    if (summaryLoading) return;

    setSummaryLoading(true);

    try {
      if (!selectedPost?.id) throw new Error('selectedPostId is not defined');

      const response = await summaryPostApi(selectedPost?.id, token);

      setSummary(response.data.result.summary);
    } catch (e) {
      logError(e);
    } finally {
      setSummaryLoading(false);
    }
  };

  const onPressPinPostOnSummary = async () => {
    await onPressPinButton();
  };

  const reportChat = async (reason: string) => {
    try {
      if (!selectedPost?.id || !selectedReportChatId.current)
        throw new Error('selectedPostId or selectedReportChatId is not defined');

      await reportCommentApi(selectedPost?.id, selectedReportChatId.current, reason, token);
    } catch (e) {
      logError(e);
    }
  };

  const afterReport = async () => {
    closeReportModal();
    await delay(500);
    openReportCompleteModal();
  };

  const requestAgain = async () => {
    // 마지막 작성자 chat을 지우고,
    const lastRequest = chatList.filter((chat) => chat.type === 'sigongan').pop();

    let updatedChatList = chatList.filter((chat) => chat.id !== selectedReportChatId.current);

    updateSelectedPost('chat', updatedChatList);

    if (!lastRequest) return;

    await addAdditionalRequest('comment', lastRequest.text);
  };

  const onPressGoBackHeader = () => {
    if (fromDeletedPostId) {
      navigation.navigate('MainTab');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <PageHeader
        title={pageTitle}
        headerLeft={
          <Icons
            type="feather"
            name="chevron-left"
            accessibilityLabel="뒤로 가기 버튼"
            size={35}
            color={theme.COLOR.GRAY_ICON}
            onPress={onPressGoBackHeader}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          />
        }
        headerRight={
          <Icons
            type="materialIcons"
            name="menu"
            size={30}
            onPress={onPressMenuIcon}
            accessibilityLabel="메뉴 버튼"
          ></Icons>
        }
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        {showSummaryButton && (
          <SummaryBox onPress={onPressSummaryButton} accessible accessibilityLabel="해설 전체 요약하기 버튼">
            <Shadow
              distance={10}
              style={{
                borderRadius: 20,
              }}
            >
              <SummaryInnerBox>
                <LinearGradient
                  colors={['#389F9F', '#FFFFFF00']}
                  style={{
                    borderRadius: 20,
                    backgroundColor: theme.COLOR.MINT_2,
                  }}
                >
                  <AISummaryIcon>
                    <Typography size="body_md" weight="semibold" color={theme.COLOR.WHITE}>
                      AI
                    </Typography>
                  </AISummaryIcon>
                </LinearGradient>
                <Typography size="body_lg" weight="semibold" color={theme.COLOR.FONT.CONTENT}>
                  해설 전체 요약하기
                </Typography>
              </SummaryInnerBox>
            </Shadow>
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
                  accessible
                  accessibilityLabel="사용자가 업로드한 사진"
                />
              </ImageBox>
              {showSelectImageAgain && (
                <BroadyButton onPress={openImagePickerModal} variant="grey" text="사진 다시 선택하기" />
              )}
            </FlexBox>
            <Margin margin={20} />
            <ChatList onPressCommentChat={onPressCommentChat} chatList={chatList} />
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
                    <Typography
                      size="body_md"
                      weight="semibold"
                      color={theme.COLOR.FONT.SUB_CONTENTDIM}
                      accessiblityLabel="해설 찜하기 버튼"
                    >
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
                      name="질문 입력"
                      placeholder="내용을 입력해주세요"
                      variant="Border"
                      paddingVariant="small"
                      borderColor={theme.COLOR.BD_5}
                      text={input}
                      onChangeText={setInput}
                      initialType="text"
                    />
                  </View>
                  <Pressable
                    onPress={onPressSendIcon}
                    accessible
                    accessibilityLabel={`질문 전송하기 버튼`}
                    accessibilityState={{
                      disabled: !Boolean(input),
                    }}
                  >
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
        setSelectedPostId={setSelectedPostId}
        setIsVisible={setIsModalVisible}
      />
      <ChatSendModal
        onPressSendToComment={() => {
          onPressSendRequest('comment');
        }}
        onPressSendToAI={() => {
          onPressSendRequest('ai');
        }}
        isSendModalVisible={isSendModalVisible}
        closeSendModal={closeSendModal}
        input={input}
        setInput={setInput}
      />
      <PostMenuModal
        isVisible={isMenuModalVisible}
        selectedPostId={selectedPostId}
        setIsVisible={closeMenuModal}
        sharePhoto={sharePicture}
      />
      <PostSummaryModal
        isVisible={isSummaryModalVisible}
        setIsVisible={closeSummaryModal}
        summary={summary}
        isSummaryLoading={summaryLoading}
        onPressPinPostOnSummary={onPressPinPostOnSummary}
      />
      <PostChatReportModal
        isVisible={isReportModalVisible}
        setIsVisible={closeReportModal}
        reportChat={reportChat}
        afterReport={afterReport}
      />
      <PostReportCompleteModal
        requestAgain={requestAgain}
        isVisible={isReportCompleteModalVisible}
        setIsVisible={closeReportCompleteModal}
      />
    </View>
  );
}
