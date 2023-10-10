import { createContext, useState, useMemo, useCallback, useContext } from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { Colors, Fonts, Utils } from '../components/renewal';

const LoadingContext = createContext<{
  isLoading: boolean;
  changeLoading: (b: boolean) => void;
} | null>(null);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(false);

  const changeLoading = useCallback((b: boolean) => {
    // 추가 작업
    Keyboard.dismiss();

    setLoading(b);
  }, []);

  const context = useMemo(() => ({ isLoading, changeLoading }), [isLoading, changeLoading]);

  return (
    <LoadingContext.Provider value={context}>
      <View style={styles.container}>
        {children}

        {isLoading && (
          <View style={[styles.loadingContainer, Utils.backgroundColor('rgba(0, 0, 0, 0.7)')]}>
            <Text style={[styles.loading, Fonts.Regular16, Utils.fontColor(Colors.None.Lighten400)]}>
              불러오는 중...
            </Text>
          </View>
        )}
      </View>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }

  return context;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {},
});
