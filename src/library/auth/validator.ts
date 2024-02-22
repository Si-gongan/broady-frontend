export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  if (!email || email.length <= 0) return '이메일을 입력해주세요.';
  if (!re.test(email)) return '유효한 이메일을 입력해주세요.';
  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return '패스워드를 입력해주세요.';
  if (password.length < 8) return '패스워드는 8자 이상이어야 합니다.';
  return '';
};
