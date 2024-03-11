declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_SERVER_URL: string;
      EXPO_PUBLIC_S3_BUCKET_URL: string;
    }
  }
}

export {};
