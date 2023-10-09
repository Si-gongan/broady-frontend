export const getKoreanTime = (targetDate: Date) => {
  const curr = new Date(targetDate);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const koreanTime = new Date(curr.getTime() + KR_TIME_DIFF);
  return koreanTime;
};

export const getConvertDate = (target: string) => {
  const currentTime = getKoreanTime(new Date());
  const targetDate = new Date(target);
  const gapMiliseconds = currentTime.getTime() - targetDate.getTime();
  const gapMinute = Math.floor(gapMiliseconds / (1000 * 60));
  const gapHour = Math.floor(gapMiliseconds / (1000 * 60 * 60));
  const gapDay = Math.floor(gapMiliseconds / (1000 * 60 * 60 * 24));
  if (gapMinute < 60) return gapMinute === 0 ? '방금 전' : `${gapMinute}분 전`;
  else if (gapHour < 24) return `${gapHour}시간 전`;
  else return `${gapDay}일 전`;
};

export const getFormattedTime = (target: string) => {
  const realTime = new Date(target);

  const hour = realTime.getUTCHours();
  const min = realTime.getUTCMinutes();

  if (hour < 12) {
    return `오전 ${hour === 0 ? 12 : hour}:${min < 10 ? '0' + min : min}`;
  } else {
    return `오후 ${hour === 12 ? hour : hour - 12}:${min < 10 ? '0' + min : min}`;
  }
};

export const getDayOfWeek = (date: Date) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const dayOfWeek = week[date.getUTCDay()];

  return dayOfWeek;
};

export const getDateInfo = (date: Date) => {
  const year = date.getUTCFullYear().toString();
  const month = (date.getUTCMonth() + 1).toString();
  const day = date.getUTCDate().toString();

  return { year, month, day };
};

export const getDate = (date: string) => new Date(date).getUTCDate();

export const delay = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};
