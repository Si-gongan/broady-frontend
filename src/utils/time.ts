export const getKoreanTime = (targetDate: Date) => {
  const curr = new Date(targetDate);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const koreanTime = new Date(curr.getTime() + KR_TIME_DIFF);
  return koreanTime;
};

export const getConvertDate = (target: Date) => {
  const currentTime = getKoreanTime(new Date());
  const targetDate = new Date(target);
  const gapMiliseconds = currentTime.getTime() - targetDate.getTime();
  const gapMinute = Math.floor(gapMiliseconds / (1000 * 60));
  const gapHour = Math.floor(gapMiliseconds / (1000 * 60 * 60));
  const gapDay = Math.floor(gapMiliseconds / (1000 * 60 * 60 * 24));
  if (gapMinute < 60) return `${gapMinute}분 전`;
  else if (gapHour < 24) return `${gapHour}시간 전`;
  else return `${gapDay}일 전`;
};

export const getRefundDate = (targetDate: Date) => {
  const date = new Date(targetDate);
  const year = date.getFullYear().toString().substring(2, 4);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getUTCHours().toString().padStart(2, '0');
  const minute = date.getUTCMinutes().toString().padStart(2, '0');
  const result = `${year}.${month}.${day} ${hour}:${minute}`;
  return result;
};

export const getFormattedTime = (target: Date) => {
  // api 시간 값 보정.
  const realTime = new Date(target);

  const hour = realTime.getUTCHours();
  const min = realTime.getUTCMinutes();

  if (hour < 12) {
    return `오전 ${hour === 0 ? 12 : hour}:${min < 10 ? '0' + min : min}`;
  } else {
    return `오후 ${hour === 12 ? hour : hour - 12}:${min < 10 ? '0' + min : min}`;
  }
};
