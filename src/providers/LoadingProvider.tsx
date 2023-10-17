import { createContext, useState, useMemo, useCallback, useContext, useRef } from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View, Keyboard, findNodeHandle, AccessibilityInfo } from 'react-native';
import { Colors, Fonts, Utils, delay } from '../components/renewal';

const LoadingContext = createContext<{
  isLoading: boolean;
  changeLoading: (b: boolean) => Promise<void>;
} | null>(null);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(false);

  const loadingTextRef = useRef<Text>(null);

  const changeLoading = useCallback(async (b: boolean) => {
    // 추가 작업
    Keyboard.dismiss();

    setLoading(b);

    if (b) {
      await delay(1500);

      const reactTag = findNodeHandle(loadingTextRef.current);

      if (reactTag) {
        AccessibilityInfo.announceForAccessibility('로딩 중입니다');
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  }, []);

  const context = useMemo(() => ({ isLoading, changeLoading }), [isLoading, changeLoading]);

  return (
    <LoadingContext.Provider value={context}>
      <View style={styles.container}>
        {children}

        {isLoading && (
          <View style={[styles.loadingContainer, Utils.backgroundColor('rgba(0, 0, 0, 0.7)')]}>
            <Text
              style={[styles.loading, Fonts.Regular16, Utils.fontColor(Colors.None.Lighten400)]}
              ref={loadingTextRef}
            >
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
