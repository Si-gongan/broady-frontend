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
  const hour = target.getHours();
  const min = target.getMinutes();

  if (hour < 13) {
    return `오전 ${hour}:${min}`;
  } else {
    return `오후 ${hour - 12}:${min}`;
  }
};
