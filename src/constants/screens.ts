export const SCREENS = {
  AUTHSTACK: {
    최초화면: 'IntroScreen' as const,
    이메일로그인: 'broadyEmailLogin' as const,
    이메일회원가입: 'broadyEmailRegister' as const,
    닉네임설정: 'nickname' as const,
    온보딩: 'onBoarding' as const,
  },
  MAINSTACK: {
    MAINTAB: {
      브로디홈: 'BroadyHome' as const,
      찜한해설: 'Pick' as const,
      브로디마이페이지: 'MyPage' as const,
    },
    브로디메인탭: 'MainTab' as const,
    브로디닉네임설정: 'MyPageNickname' as const,
    브로디대화방: 'Post' as const,
    브로디자주묻는질문: 'Faq' as const,
  },
  COMMENTSTACK: {
    COMMENTTAB: {
      해설자홈: 'CommentHome' as const,
      우수해설: 'ExcellentCommentary' as const,
      MY의뢰: 'MyRequest' as const,
      마이페이지: 'MyPage' as const,
    },
    해설자메인탭: 'CommentTab' as const,
    해설자대화방: 'Post' as const,
  },
};
