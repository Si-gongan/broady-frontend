export const delay = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

export const formatTimeToDDMMDD = (date: Date) => {
  // 날짜 객체를 이용해 시간을 가져옴
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();

  // 오전인지 오후인지 판단
  let ampm = hours >= 12 ? '오후' : '오전';

  // 12시간 형식으로 변경
  hours = hours % 12;
  hours = hours ? hours : 12; // 0시는 12시로 표시

  // 분을 두 자리 숫자로 포맷팅
  minutes = minutes < 10 ? '0' + minutes : minutes;

  // 포맷된 문자열 반환
  return ampm + ' ' + hours + ':' + minutes;
};
