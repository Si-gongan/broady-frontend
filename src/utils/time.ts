export const getKoreanTime = () => {
  const curr = new Date();
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const koreanTime = new Date(curr.getTime() + KR_TIME_DIFF);
  return koreanTime;
};

export const getConvertDate = (target: Date) => {
  const currentTime = getKoreanTime();
  const gapMiliseconds = currentTime.getTime() - target.getTime();
  const gapMinute = Math.floor(gapMiliseconds / (1000 * 60));
  const gapHour = Math.floor(gapMiliseconds / (1000 * 60 * 60));
  const gapDay = Math.floor(gapMiliseconds / (1000 * 60 * 60 * 24));
  if (gapMinute < 60) return `${gapMinute}분 전`;
  else if (gapHour < 24) return `${gapHour}시간 전`;
  else return `${gapDay}일 전`;
};

export const getFormattedTime = (target: Date) => {
  // api 시간 값 보정
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const realTime = new Date(target.getTime() - KR_TIME_DIFF);

  const hour = realTime.getHours();
  const min = realTime.getMinutes();

  if (hour < 12) {
    return `오전 ${hour === 0 ? 12 : hour}:${min < 10 ? '0' + min : min}`;
  } else {
    return `오후 ${hour === 12 ? hour : hour - 1}:${min < 10 ? '0' + min : min}`;
  }
};
