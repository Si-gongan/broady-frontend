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

export const getExpiredMinute = (target: string) => {
  const gap = new Date(target).getTime() - getKoreanTime(new Date()).getTime();
  const gapMinute = Math.floor(gap / (1000 * 60));
  return gapMinute;
};

// for sigongan

// api 시간 값 보정.
// 무조건 UTC로 얻어와야 한국 시간
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

export const getYYMMDD = (currentTime: Date) => {
  const year = currentTime.getFullYear();
  const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
  const date = currentTime.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${date}`;
};

export const getYYMMDDHHMM = (currentTime: Date) => {
  const year = currentTime.getFullYear();
  const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
  const date = currentTime.getDate().toString().padStart(2, '0');
  const hour = currentTime.getUTCHours().toString().padStart(2, '0');
  const minute = currentTime.getUTCMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${date} ${hour}:${minute}`;
};

export const getDateText = (currentTime: Date) => {
  const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
  const date = currentTime.getDate().toString().padStart(2, '0');
  const hour = currentTime.getUTCHours().toString().padStart(2, '0');
  const minute = currentTime.getUTCMinutes().toString().padStart(2, '0');
  return `${month}월 ${date}일 ${hour}시 ${minute}분`;
};
