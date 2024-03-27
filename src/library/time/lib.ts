import { IsoString } from '@/@types/date';

export const delay = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

// export const formatTimeToDDMMDD = (input: IsoString) => {
//   // 날짜 객체를 이용해 시간을 가져옴

//   const date = new Date(input);

//   let hours = date.getHours();
//   let minutes: string | number = date.getMinutes();

//   // 오전인지 오후인지 판단
//   let ampm = hours >= 12 ? '오후' : '오전';

//   // 12시간 형식으로 변경
//   hours = hours % 12;
//   hours = hours ? hours : 12; // 0시는 12시로 표시

//   // 분을 두 자리 숫자로 포맷팅
//   minutes = minutes < 10 ? '0' + minutes : minutes;

//   // 포맷된 문자열 반환
//   return ampm + ' ' + hours + ':' + minutes;
// };

export const formatTimeToDDMMDD = (input: string) => {
  const currentDate = new Date();
  const inputDate = new Date(input);

  // Check if it is today's date
  if (
    inputDate.getDate() === currentDate.getDate() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear()
  ) {
    let hours = inputDate.getHours();
    let minutes: string | number = inputDate.getMinutes();
    let ampm = hours >= 12 ? '오후' : '오전';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 o'clock is displayed as 12 o'clock
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return ampm + ' ' + hours + ':' + minutes;
  }

  // Check if it is yesterday's date
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  if (
    inputDate.getDate() === yesterday.getDate() &&
    inputDate.getMonth() === yesterday.getMonth() &&
    inputDate.getFullYear() === yesterday.getFullYear()
  ) {
    return 'yesterday';
  }

  // For any other date, return the date in the format "DD day of MM month"
  const day = inputDate.getDate();
  const month = inputDate.toLocaleString('default', { month: 'long' });
  return `${month} ${day}일`;
};
