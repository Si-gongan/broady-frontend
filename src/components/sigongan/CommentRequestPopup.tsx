import { View, Text, Image, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { BottomSheet } from 'react-native-btr';
import { SigonganColor } from './styles';

export const CommentRequestPopup = () => {
  return (
    <BottomSheet visible={true}>
      <View style={styles.container}>
        <Text style={styles.title}>사진 선택</Text>

        <View style={styles.divider} />

        <View style={styles.itemWrapper}>
          <View style={styles.item}>
            <Text style={styles.itemText}>직접 촬영</Text>
            <MaterialIcons name="arrow-forward-ios" style={styles.itemIcon} />
          </View>

          <View style={styles.divider} />

          <View style={styles.item}>
            <Text style={styles.itemText}>갤러리에서 선택</Text>
            <MaterialIcons name="arrow-forward-ios" style={styles.itemIcon} />
          </View>

          <View style={styles.divider} />

          <View style={styles.item}>
            <Text style={styles.itemText}>취소</Text>
            <MaterialIcons name="arrow-forward-ios" style={styles.itemIcon} />
          </View>

          <View style={styles.divider} />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    backgroundColor: SigonganColor.popupBackground,

    paddingTop: 8,
    borderRadius: 16,
  },
  title: {
    color: SigonganColor.popupText,
    fontSize: 18,
    fontStyle: 'italic',

    paddingVertical: 12,
  },
  divider: {
    backgroundColor: SigonganColor.popupDivider,
    width: '100%',
    height: 1,
  },
  itemWrapper: {
    width: '100%',

    paddingLeft: 25,
    paddingRight: 9,

    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 12,
  },
  itemText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  itemIcon: {
    fontSize: 16,
    color: SigonganColor.popupNextIcon,

    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
