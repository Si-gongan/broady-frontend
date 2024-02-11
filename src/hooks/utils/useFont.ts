import { useFonts } from 'expo-font';

export const useFont = () => {
  const [fontsLoaded] = useFonts({
    Inter: require('../../../assets/font/Inter-Regular.ttf'),
    'Inter-Bold': require('../../../assets/font/Inter-SemiBold.ttf'),
  });

  return fontsLoaded;
};
