import { AxiosError } from 'axios';

export const logError = (e: any) => {
  console.log(e);

  if (e instanceof AxiosError) {
    console.log(e.response?.data);
  }
};
